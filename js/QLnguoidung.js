//chức năng : hiển thị modal thêm người dùng
var ajaxNguoiDung = new ajaxNguoiDung();

var GetUserFromLocal = function () {
    var JSONnguoidung = localStorage.getItem("ThongTinNguoiDung");
    var nguoidung = JSON.parse(JSONnguoidung);
    console.log(nguoidung);
    $('#TenNguoiDung').html(nguoidung.TaiKhoan);
}
GetUserFromLocal();
var DSnguoidung = [];
var hienthiModal = function () {
    //đổi title của Modal
    $('.modal-title').html('Thêm người dùng');
    var btnGroups = `
        <button class="btn btn-success" id="btnThem">Thêm Người Dùng</button>
        <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footer').html(btnGroups);
}
//Chức năng : Thêm người dùng
function Add() {
    var taikhoan = $('#TaiKhoan').val();
    var matkhau = $('#MatKhau').val();
    var hoten = $('#HoTen').val();
    var email = $('#Email').val();
    var sodt = $('#SoDienThoai').val();
    var maloai = $('#MaLoaiNguoiDung').val();

    //tạo đối tượng người dùng
    var nguoidung = new NguoiDung(taikhoan, matkhau, hoten, email, sodt, maloai);
    console.log(nguoidung);
    //push người dùng vào danh sách

    //kết nối sever thêm người dùng mới
    ajaxNguoiDung.ajaxAddUser(nguoidung).done(function (res) {
        console.log(res);
        //hiển thị Sweetalert
        swal("Thêm người dùng thành công!", "You clicked the button!", "success");

        //cách 1:
        getUserListFormDB();
        //cách 2:
        //DSnguoidung.push(nguoidung);
        //hienthi(DSnguoidung);

    }).fail(function (err) {
        console.log(err);
    })

    //DSnguoidung.push(nguoidung);
    //ẩn modal 
    $('.close').trigger("click"); //yêu cầu nút close click
    //clear input
    $('.model-body input').val('');
}

function hienthi(mang) {
    var content = "";
    for (var i = 0; i < mang.length; i++) {
        var nguoidung = DSnguoidung[i];
        content = content + `
            <tr>
                <td>${i + 1}</td>
                <td>${nguoidung.TaiKhoan}</td>
                <td>${nguoidung.MatKhau}</td>
                <td>${nguoidung.HoTen}</td>
                <td>${nguoidung.Email}</td>
                <td>${nguoidung.SoDT}</td>
                <td>
                    <button class="btn btn-info btnSua"
                    data-taikhoan="${nguoidung.TaiKhoan}"
                    data-matkhau="${nguoidung.MatKhau}" 
                    data-hoten="${nguoidung.HoTen}"
                    data-email="${nguoidung.Email}"
                    data-sodt="${nguoidung.SoDT}"
                    data-maloainguoidung="${nguoidung.MaLoaiNguoiDung}"  
                    data-toggle="modal" data-target="#myModal"
                    >Sửa</button>
                    <button class="btn btn-danger btnXoa"  data-taikhoan="${nguoidung.TaiKhoan}" onclick="Xoa()">Xóa</button>
				
                    </td>
            </tr>
        `
    } $('#tblDanhSachNguoiDung').html(content);
}
//  <button class="btn btn-success btnXoa" data-taikhoan="${nguoidung.TaiKhoan}" >Xóa</button>

function TimViTri(DSND, taikhoan) {
    for (var i = 0; i < DSND.length; i++) {
        if (DSND[i].TaiKhoan == taikhoan) {
            return i;
        }
    } return -1;
}
function Xoa() {
    var taikhoan = $(this).attr('data-taikhoan');
    ajaxNguoiDung.ajaxDeleteUser(taikhoan).done(function (res) {
        var index = TimViTri(DSnguoidung, taikhoan);
        if (index !== -1) {
            DSnguoidung.splice(index, 1);
            getUserListFormDB();
        }
        console.log(res);
    }).fail(function (err) {
        console.log(err);
    })
    // var button_target=event.target; //nơi xảy ra sự kiện
    // var manv=button_target.getAttribute("data-taikhoan");
    // console.log(manv);
    // var index=TimViTri(manv);
    // if(index !== -1)
    // {
    // 	DSnguoidung.splice(index,1); //splice cho mảng
    // 	console.log(DSnguoidung);
    // 	hienthi(DSnguoidung);
    // }
}

function LayThongTin() {
    var tk = $(this).attr('data-taikhoan');
    var mk = $(this).attr('data-matkhau');
    var ht = $(this).attr('data-hoten');
    var email = $(this).attr('data-email');
    var sodt = $(this).attr('data-sodt');
    var maloai = $(this).attr('data-maloainguoidung');
    console.log(tk, mk, ht, email, sodt, maloai);
    //b2:set giá trị cho input
    $('#TaiKhoan').val(tk);
    $('#MatKhau').val(mk);
    $('#HoTen').val(ht);
    $('#Email').val(email);
    $('#SoDienThoai').val(sodt);
    $('#MaLoaiNguoiDung').val(maloai);
    //b3:cập nhật lại modal
    modalcapnhat();


}
function Capnhatnguoidung() {
    var taikhoan = $('#TaiKhoan').val();
    var matkhau = $('#MatKhau').val();
    var hoten = $('#HoTen').val();
    var email = $('#Email').val();
    var sodt = $('#SoDienThoai').val();
    var maloai = $('#MaLoaiNguoiDung').val();
    //tạo đối tượng người dùng
    var nguoidung = new NguoiDung(taikhoan, matkhau, hoten, email, sodt, maloai);
    // for(var i=0;i<DSnguoidung.length;i++){
    //     if(DSnguoidung[i].TaiKhoan===taikhoan)
    //     {
    //         DSnguoidung[i]=nguoidung;
    //     }
    // }

    ajaxNguoiDung.ajaxUpdateUser(nguoidung).done(function (res) {
        console.log(res);
        getUserListFormDB();

    }).fail(function (err) {
        console.log(err);
    })



    $('.close').trigger("click"); //yêu cầu nút close click

}



function modalcapnhat() {
    //đổi title của Modal
    $('.modal-title').html('Cập nhật người dùng');
    var btnGroups = `
        <button class="btn btn-success" id="btnCapNhat">Cập Nhật</button>
        <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footer').html(btnGroups);
}

var getUserListFormDB = function () {
    ajaxNguoiDung.ajaxGetUserlist().done(function (res) {

        //code chạy khi sever trả về kết quả
        DSnguoidung = res;
        hienthi(DSnguoidung);
        console.log(res);
    }).fail(function (err) {
        console.log(err);
    })

}
getUserListFormDB();
 


//-----Gắn Sự Kiện-------
$('#btnThemNguoiDung').click(hienthiModal);
//đối với các thẻ được tạo động thông qua code javascript thì gắn sự kiện kiểu khác 
$('body').delegate('#btnThem', 'click', Add);
$('body').delegate('.btnXoa', 'click', Xoa);
$('body').delegate('.btnSua', 'click', LayThongTin);
$('body').delegate('#btnCapNhat', 'click', Capnhatnguoidung);



$('.btnToggle').click(function () {
    $('p').toggle(500, function () {
        $(this).css({ "color": "blue" });
    });
});