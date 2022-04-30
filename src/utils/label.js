let label = {};

/**
 * 通过a标签下载
 * @param url
 */
label.downloadByA = function (url) {
    let domA = document.createElement('a'); // js创建a标签
    domA.style.display = 'none';
    domA.target = '_blank';
    domA.setAttribute('download', ''); // 给a标签设置download属性
    domA.setAttribute('href', url); // 给a标签href属性赋值为要下载文件的路径
    domA.click(); // 点击下载
};

export default label;
