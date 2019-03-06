var DSKH=[];
function hienthi(mang){
    var content="";
    for(var i=0;i<mang.length;i++)
    {
        var kh=mang[i];
        content=content + 
        `
            <div class="col-md-3 mb-3" >
                <div class="card" style="max-height:300px">
                    <img src="${kh.HinhAnh}" style="height:150px" />
                    <p style="color:blue"><span></span>${kh.TenKhoaHoc}</p>
                    <p>${kh.NguoiTao}</p>
                    <a href="chitiet.html?makhoahoc=${kh.MaKhoaHoc}" class="btn btn-success btnxem" >Xem Chi Tiet</a>
                </div>
            </div>
        `
    }
    $('#danhsachkhoahoc').html(content);
}
var GetUserFromLocal=function(){
    var JSONnguoidung=localStorage.getItem("ThongTinNguoiDung");
    var nguoidung=JSON.parse(JSONnguoidung);
    console.log(nguoidung);
    $('#TenNguoiDung').html(nguoidung.TaiKhoan);
}
var GetKHlistfromDB = function(){
    $.ajax({
        url:'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc',
        type:'GET'

    }).done(function(res){
        console.log(res);
        DSKH=res;
        hienthi(DSKH);
    }).fail(function(err){
        console.log(err);
    })
}
GetKHlistfromDB();
GetUserFromLocal();

//  $('body').delegate('.btnxem','click',function(){
//      window.location.assign('chitiet.html?makhoahoc='+ ma)
//  })
 