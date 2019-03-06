var DSND=[];
function LayDSND(){
    $.ajax({
        url:'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
        type:'GET',
    }).done(function(res){
        console.log(res);
        DSND=res;
        
    }).fail(function(err){
        console.log(err);
    })
}
LayDSND();
function KiemtraTaiKhoan(mang,nguoidung){
    for(var i=0;i<mang.length;i++){
        if(mang[i].TaiKhoan===nguoidung.TaiKhoan)
        { 
            alert('Tài Khoản Này Đã Tồn Tại');
            return -1;
        }
        return true;
         
         
    }
}
function DangKy(){
    var taikhoan=$('#TaiKhoan').val();
    var matkhau=$('#MatKhau').val();
    var hoten=$('#HoTen').val();
    var email=$('#Email').val();
    var sodt=$('#SoDienThoai').val();
    var maloai = $('#MaLoaiNguoiDung').val();
    var nguoidung=new NguoiDung(taikhoan, matkhau, hoten, email, sodt, maloai);
    console.log(nguoidung);
   
    var index=KiemtraTaiKhoan(DSND,nguoidung);
    if(index !== -1){
        $.ajax({
            url:'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
            type:'POST',
            data:nguoidung,
        }).done(function(res){
            console.log(res);
            alert('Đăng ký thành công');

        }).fail(function(err){
            console.log(err);
        })
    }

 }
 $('#btnDangKy').click(DangKy);