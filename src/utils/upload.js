import mvue from '@/main';
import digital from '@/utils/digital';
import md5 from 'js-md5';

let upload = {};
export const uploadByPieces = ({file, uploadPath, pieceSize = 10, progress, success, error}) => {
    upload.shardSize = pieceSize * 1024 * 1024; // 10MB/片
    upload.shardCount = Math.ceil(file.size / upload.shardSize); // 总片数
    upload.hasExist = []; // 某个文件已经上传的部分
    upload.progressIndex = 0;
    const readFile = () => {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.addEventListener('load', e => {
            let fileBlob = e.target.result;
            upload.md5 = md5(fileBlob) + md5(file.name); // 根据文件内容和文件名合成唯一md5值
            let params = {
                uploadPath: uploadPath,
                md5: upload.md5,
                fileName: file.name
            };
            mvue.$axios.get('/boot/file/fileUpload/isExist', {params: params}).then(res => {
                if (res.data.success) {
                    if (typeof res.data.result == 'string') {
                        // 文件已经上传
                        success && success({isExist: true, suffixUrl: res.data.result});
                    } else if (Array.isArray(res.data.result)) {
                        // 已经上传的部分
                        upload.hasExist = res.data.result;
                        readShard();
                    } else {
                        error && error('未知异常');
                    }
                } else {
                    // 文件不存在，开始准备上传
                    readShard();
                }
            }).catch(e => {
                error && error(e);
            });
        });
    };
    // 获取分片相关信息
    const getShardInfo = (file, currentShard, shardSize) => {
        let start = currentShard * shardSize;
        let end = Math.min(file.size, start + shardSize);
        let shard = file.slice(start, end);
        return {start, end, shard};
    };
    // 读取分片
    const readShard = () => {
        let promiseAll = [];
        for (let i = 0; i < upload.shardCount; i++) {
            // 已经存在的分片无需再次上传
            if (!upload.hasExist.includes(i)) {
                const {shard} = getShardInfo(file, i, upload.shardSize);
                promiseAll.push(uploadShard({shard, currentShard: i}));
            }
        }
        // 存在某些分片未上传
        if (promiseAll.length) {
            progress('show');
            progress(digital.keepDecimal(upload.hasExist.length * (90 / upload.shardCount), 2));
            Promise.all(promiseAll).then(result => {
                if (!result.includes('fail')) {
                    // 所有分片都已经上传成功，准备合并
                    mergeShard();
                } else {
                    error && error('分片上传异常');
                }
            }).catch(e => {
                error && error(e);
            });
        } else {
            // 说明所有的分片已经上传，仅仅未合并
            mergeShard();
        }
    };
    // 合并分片
    const mergeShard = () => {
        let params = {
            uploadPath: uploadPath,
            md5: upload.md5,
            fileName: file.name
        };
        mvue.$axios.get('/boot/file/fileUpload/shardMerge', {params: params}).then(res => {
            if (res.data.success) {
                progress(100);
                success && success({shardMerge: true, suffixUrl: res.data.result || ''});
            } else {
                error && error(res.data.message);
            }
        }).catch(e => {
            error && error(e);
        });
    };
    // 上传分片
    const uploadShard = ({shard, currentShard}) => {
        let params = {
            file: shard,
            uploadPath: uploadPath,
            md5: upload.md5,
            fileName: file.name,
            currentShard: currentShard
        };
        let formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));
        return new Promise((resolve, reject) => {
            mvue.$axios.post('/boot/file/fileUpload/shardUpload', formData).then(res => {
                if (res.data.success) {
                    progress(digital.keepDecimal((++upload.progressIndex + upload.hasExist.length) * (90 / upload.shardCount), 2));
                    resolve('success');
                } else {
                    reject('fail');
                }
            }).catch(e => {
                reject('fail');
            });
        });
    };
    // 调用uploadByPieces()，开始读取文件
    readFile();
};


