var DSKH = [];
var ajaxKhoaHoc = new ajaxKhoaHoc();
var hienthiModalKH = function () {
    //đổi title của Modal
    $('#formNguoiTao').hide();
    $('.modal-title2').html('Thêm Khóa Học');
    var btnGroups = `
        <button class="btn btn-success" id="btnThemKH">Thêm Khóa Học</button>
        <button class="btn btn-secondary " id="close" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footerKH').html(btnGroups);
}
function ThemKhoaHoc() {
    var JSONnguoidung = localStorage.getItem("ThongTinNguoiDung");
    var nguoidung = JSON.parse(JSONnguoidung);
    var makh = $('#makhoahoc').val();
    var tenkh = $('#tenkhoahoc').val();
    var hinhanh = $('#hinhanh').val();
    var mota = $('#mota').val();
    var luotxem = $('#luotxem').val();
    var nguoitao = nguoidung.TaiKhoan;
    var khoahocmoi = new KhoaHoc(makh, tenkh, mota, hinhanh, luotxem, nguoitao);
    console.log(khoahocmoi);
    ajaxKhoaHoc.ajaxAddKHfromDB(khoahocmoi).done(function (res) {
        console.log(res);
        //hiển thị Sweetalert

        //cách 1:
        GetDSKHformDB();
        //cách 2:
        //DSnguoidung.push(nguoidung);
        //hienthi(DSnguoidung);

    }).fail(function (err) {
        console.log(err);
    })

}
function LayDanhSachGV() {
    ajaxNguoiDung.ajaxGetGVfromDB().done(function (res) {
        var content = "";
        for (var i = 0; i < res.length; i++) {
            if (res[i].MaLoaiNguoiDung === "GV") {
                content = content + `
                <option value="${res[i].TaiKhoan}">${res[i].HoTen}</option>
                `
            }
        }
        $('#NguoiTao').html(content);
    }).fail(function (err) {
        console.log(err);
    })
}
function hienthikhoahoc(mang) {
    var content = "";
    for (var i = 0; i < mang.length; i++) {
        var kh = mang[i];
        content = content +
            `
        <tr>
        <td>${i + 1}</td>
        <td>${kh.MaKhoaHoc}</td>
        <td>${kh.TenKhoaHoc}</td>
 
        <td ><img src="${kh.HinhAnh}"style="max-width:150px"></td>
        <td style="max-width:300px">${kh.MoTa}</td>
        <td>${kh.LuotXem}</td>
        <td id="tdNguoiTao">${kh.NguoiTao}</td>

        <td>
            <button class="btn btn-info btnSua"
            data-MaKhoaHoc="${kh.MaKhoaHoc}"
            data-TenKhoaHoc="${kh.TenKhoaHoc}" 
            data-HinhAnh="${kh.HinhAnh}"
            data-MoTa="${kh.MoTa}"
            data-LuotXem="${kh.LuotXem}"
            data-NguoiTao="${kh.NguoiTao}"  
            data-toggle="modal" data-target="#myModal2"
            >Sửa</button>
            <button class="btn btn-danger btnXoa"  data-makhoahoc="${kh.MaKhoaHoc}" >Xóa</button>
        
            </td>
    </tr>
        `
    }
    $('#tblDanhSachKhoaHoc').html(content);
}

function LayThongTinKH() {
    var ma = $(this).attr('data-MaKhoaHoc');
    var ten = $(this).attr('data-TenKhoaHoc');
    var hinhanh = $(this).attr('data-HinhAnh');
    var mota = $(this).attr('data-MoTa');
    var luotxem = $(this).attr('data-LuotXem');
    var nguoitao = $(this).attr('data-NguoiTao');
    $('#formNguoiTao').show();
    CapNhatModalKH();
    var laytennguoitao = JSON.stringify(nguoitao);
    localStorage.setItem("nguoitao", laytennguoitao);
    $('#makhoahoc').val(ma);
    $('#tenkhoahoc').val(ten);
    $('#hinhanh').val(hinhanh);
    $('#mota').val(mota);
    $('#luotxem').val(luotxem);





}
function CapNhatModalKH() {
    LayDanhSachGV();
    $('.modal-title2').html('Cập Nhật Khóa Học');
    var content = `
    <button class="btn btn-success " id="btnCapNhatKH">Cập Nhật Khóa Học</button>
    <button class="btn btn-secondary" id="close" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footerKH').html(content);
}

var GetDSKHformDB = function () {
    ajaxKhoaHoc.ajaxGetListKHfromDB().done(function (res) {
        console.log(res);
        DSKH = res;
        hienthikhoahoc(DSKH);
    }).fail(function (err) {
        console.log(err);
    })
}
GetDSKHformDB();

function TimViTriKH(DSND, ma) {
    for (var i = 0; i < DSND.length; i++) {
        if (DSND[i].MaKhoaHoc == ma) {
            return i;
        }
    } return -1;
}
var DeleteKHfromDB = function () {
    var id = $(this).attr('data-makhoahoc');
    console.log(id);
    ajaxKhoaHoc.ajaxDeleteKHfromDB(id).done(function (res) {
        var index = TimViTriKH(DSKH, id);
        if (index != -1) {
            DSKH.splice(index, 1);
            GetDSKHformDB();
        }
        console.log(res);
    }).fail(function (err) {
        console.log(err);
    })
}

var UpdateKHfromDB = function () {

    var ma = $('#makhoahoc').val();
    var ten = $('#tenkhoahoc').val();
    var hinhanh = $('#hinhanh').val();
    var mota = $('#mota').val();
    var luotxem = $('#luotxem').val();
    var nguoitao = $('#NguoiTao').val();
    console.log(nguoitao);
    var khmoi = new KhoaHoc(ma, ten, mota, hinhanh, luotxem, nguoitao);
    ajaxKhoaHoc.ajaxUpdateKHfromDB(khmoi).done(function (res) {
        console.log(res);
        GetDSKHformDB();
    }).fail(function (err) {
        console.log(err);
    });
    $('#close').trigger('click');

}

function TimKiemKhoaHoc(){
    var DStimkiem=[];
    var keyword=$('#timkiem').val();
    for(var i=0;i<DSKH.length;i++){
        if(DSKH[i].MaKhoaHoc===keyword || DSKH[i].TenKhoaHoc.toLowerCase().trim().indexOf(keyword.toLowerCase().trim()) !== -1 ){
            DStimkiem.push(DSKH[i]);
         }
    }
    hienthikhoahoc(DStimkiem);
    console.log(DStimkiem);
}

$('#btnThemKhoaHoc').click(hienthiModalKH);
$('body').delegate('#btnThemKH', 'click', ThemKhoaHoc);
$('body').delegate('.btnXoa', 'click', DeleteKHfromDB);
$('body').delegate('.btnSua', 'click', LayThongTinKH);
$('body').delegate('#btnCapNhatKH', 'click', UpdateKHfromDB);




