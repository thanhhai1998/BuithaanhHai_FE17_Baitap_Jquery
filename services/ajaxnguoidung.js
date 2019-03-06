function ajaxNguoiDung(){
    this.ajaxGetUserlist = function(){
        return $.ajax({
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
            type:'GET'
        })
    }
    this.ajaxDeleteUser = function(taikhoan){
        return $.ajax({
            url :'http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/' + taikhoan,
            type: 'DELETE'
        })
    }
    this.ajaxUpdateUser = function(nguoidung){
        return $.ajax({
            url:'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung',
            type:'PUT',
            data:nguoidung
    
        })
    }
    this.ajaxAddUser=function(nguoidung){
         return $.ajax({
            url:'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
            type:'POST',
            data:nguoidung
        })
    }
    this.ajaxGetGVfromDB=function(){
        return $.ajax({
            url:'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
            type:'GET'
        })
    }
 }