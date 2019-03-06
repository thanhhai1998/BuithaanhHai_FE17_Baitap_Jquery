function ajaxKhoaHoc(){
    this.ajaxGetListKHfromDB =function(){
       
        return $.ajax({
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc',
            type: 'GET'
    
        })
    }
    this.ajaxAddKHfromDB =function(khoahocmoi){
        return $.ajax({
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc',
            type: 'POST',
            data: khoahocmoi,
        })
    }
    this.ajaxUpdateKHfromDB =function(khmoi){
        return $.ajax({
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc',
            type: 'PUT',
            data: khmoi,
        })
    }
    this.ajaxDeleteKHfromDB =function(id){
        return $.ajax({
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/' + id,
            type: 'DELETE'
        })
    }
}