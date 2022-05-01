import mvue from '@/main';

let excel = {};

excel.import = (file) => {
    let formData = new FormData();
    formData.append('file', file.file);
    formData.append('component', 'sysRole');
    mvue.$axios.post('/boot/file/excel/import', formData).then(res => {
        if (res.data.success) {
            mvue.$message.success('导入成功');
        }
    }).catch(e => {
        mvue.$message.error(e);
    });
};

excel.export = (zhName, params, excelName) => {
    let suffixMap = {
        '导出': 'export',
        '下载模板': 'template'
    };
    let url = '/boot/file/excel/' + suffixMap[zhName];
    mvue.$axios.get(url, {params: params, responseType: 'blob'}).then(res => {
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([res.data]), excelName + '.xls');
        } else {
            let url = window.URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.ms-excel'}));
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', excelName + '.xls');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // 下载完成移除元素
            window.URL.revokeObjectURL(url); // 释放掉blob对象
        }
    }).catch(e => {
        mvue.$message.error(e);
    });
};

export default excel;
