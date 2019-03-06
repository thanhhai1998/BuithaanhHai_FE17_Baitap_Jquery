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

function DangNhap(){
    var tk=$('#TaiKhoan').val();
    var mk=$('#MatKhau').val();
    console.log(tk);
    console.log(mk);
    for(var i=0;i<DSND.length;i++){
        if(DSND[i].TaiKhoan === tk && DSND[i].MatKhau===mk ){
            console.log(DSND[i]);
            var  nguoidung=JSON.stringify(DSND[i]);
            localStorage.setItem("ThongTinNguoiDung",nguoidung);

            if(DSND[i].MaLoaiNguoiDung === 'GV')
            {
                
                $('#btnDangNhap').attr('href','Jquery.html');
            }
            else{
                $('#btnDangNhap').attr('href','KhoaHoc.html');

            }
        }
    }
}
$('#btnDangNhap').click(DangNhap);