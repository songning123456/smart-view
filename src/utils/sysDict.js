import mvue from '@/main';

export function dictItem(dictCode) {
    return new Promise((resolve) => {
        mvue.$axios.get('/boot/sys/sysDictItem/dictItem/' + dictCode).then(res => {
            if (res.data.success) {
                resolve(res.data.result);
            } else {
                mvue.$message.error(res.data.message);
            }
        }).catch(e => {
            mvue.$message.error(e);
        });
    });
}
