import common from '@/utils/common';
import md5 from 'js-md5';
import bxios from '@/axios';

let upload = {};
export const uploadByPieces = ({file, fileType, pieceSize = 10, progress, success, error}) => {
    upload.chunkSize = pieceSize * 1024 * 1024; // 10MB/片
    upload.chunkCount = Math.ceil(file.size / upload.chunkSize); // 总片数
    upload.hasExist = []; // 某个文件已经上传的部分
    upload.progressIndex = 0;
    const readFile = () => {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.addEventListener('load', e => {
            let fileBlob = e.target.result;
            upload.md5 = md5(fileBlob);
            let params = {
                fileType: fileType,
                md5: upload.md5,
                fileName: file.name
            };
            bxios.get('/boot/file/fileUpload/isExist', {params: params}).then(res => {
                if (res.data.success) {
                    if (typeof res.data.result == 'string' && res.data.result) {
                        // 文件已经上传
                        success && success({isExist: true, md5: upload.md5});
                    } else if (Array.isArray(res.data.result) && res.data.result.length) {
                        // 已经上传的部分
                        upload.hasExist = data.result;
                        readChunk();
                    }
                } else {
                    readChunk();
                }
            }).catch(e => {
                error && error(e);
            });
        });
    };
    // 获取分片相关信息
    const getChunkInfo = (file, currentChunk, chunkSize) => {
        let start = currentChunk * chunkSize;
        let end = Math.min(file.size, start + chunkSize);
        let chunk = file.slice(start, end);
        return {start, end, chunk};
    };
    const readChunk = () => {
        let promiseAll = [];
        for (let i = 0; i < upload.chunkCount; i++) {
            // 已经存在的分片无需上传
            if (!upload.hasExist.includes(i)) {
                const {chunk} = getChunkInfo(file, i, upload.chunkSize);
                promiseAll.push(uploadChunk({chunk, currentChunk: i}));
            }
        }
        // 存在某些分片未上传
        if (promiseAll.length) {
            progress(common.keepDecimal(upload.hasExist * (90 / upload.chunkCount), 2));
            success && success({showProgress: true});
            Promise.all(promiseAll).then(result => {
                if (!result.includes('fail')) {
                    // 所有分片都已经上传成功，准备合并
                    mergeChunk();
                }
            }).catch(e => {
                error && error(e);
            });
        } else {
            // 说明所有的分片已经上传，仅仅未合并
            mergeChunk();
        }
    };
    // 合并分片
    const mergeChunk = () => {
        let params = {
            fileType: fileType,
            md5: upload.md5,
            fileName: file.name
        };
        bxios.get('/boot/file/fileUpload/shardMerge', {params: params}).then(res => {
            if (res.data.success) {
                progress(100);
                success && success({shardMerge: true, hideProgress: true, fileName: res.data.result || ''});
            } else {
                error && error(data.message);
            }
        }).catch(e => {
            error && error(e);
        });
    };
    // 上传分片
    const uploadChunk = ({chunk, currentChunk}) => {
        let params = {
            file: chunk,
            fileType: fileType,
            md5: upload.md5,
            currentChunk: currentChunk
        };
        let formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));
        return new Promise((resolve, reject) => {
            bxios.post('/boot/file/fileUpload/shardUpload', formData).then(res => {
                if (res.data.success) {
                    progress(common.keepDecimal((++upload.progressIndex + upload.hasExist) * (90 / upload.chunkCount), 2));
                    resolve('success');
                } else {
                    reject('fail');
                }
            }).catch(e => {
                reject('fail');
            });
        });
    };
    readFile();
};


