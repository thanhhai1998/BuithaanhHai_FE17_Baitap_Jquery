function hienthikhoahoc(khoahoc){
    var content="";
    content=content+`
        <img src="${khoahoc.HinhAnh}" style="height:200px">
        <div>${khoahoc.MoTa}</div>
        <div>${khoahoc.TenKhoaHoc}</div>
        <div>${khoahoc.NguoiTao}</div>
    `
    $('.chitietkhoahoc').html(content);
}
function getParamsFromURL(){
    var params = window.location.search.substr(1,).split('='); //substr cắt chuỗi split cắt chuỗi khi gặp dấu =
    console.log(params);
    var courseId=params[1];
    console.log(courseId);
    $.ajax({
        url:'http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/'+courseId,
        type:'GET',
    }).done(function(res){
        console.log(res);
        kh=res;
        hienthikhoahoc(kh);
    }).fail(function(err){
        console.log(err)
    })
}
getParamsFromURL();
 
 