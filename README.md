# gas-danh_gia_ky
Code
- Quản lý: tự động tạo clone spreadsheets template và send mail cho nhân viên
  - code ở quan_ly_branch
- Nhân viên: nộp form và chuyển quyền sở hữu spreadsheets cho quản lý
  - code ở nhan_vien_branch
    
Yêu cầu
- Quản lý
  - Tạo ss template đánh giá - tùy chỉnh - điền id sheets vào ô B1 sheet template
  - Tạo folder lưu file đánh giá nhân viên - tùy chỉnh - điền id folder vào ô B1 sheet template
  - Điền tên nhân viên ở cột A, email ở cột B
  - Chạy scripts clone ss template đánh giá cho từng nhân viên
  - Yêu cầu scripts:
    - Tạo ss clone:
      - định dạng tên - tùy chỉnh - name + " đánh giá kỳ T1-T6/2024"
      - trạng thái sharing: DriveApp.Access.PRIVATE, DriveApp.Permission.EDIT, share quyền edit cho email tương ứng
    - gửi mail:
        - tên người gửi - tùy chỉnh
        - tiêu đề - tùy chỉnh 
        - nội dung mail  - tùy chỉnh 
    - điền link clone ở cột C, trạng thái ở cột D
     
![image](https://github.com/nguyenmanhcuong1291/gas-danh_gia_ky/assets/165188955/7a17f0a5-cb40-47db-bc38-efe52d7de334)

- Nhân viên:
  - Điền nội dung đánh giá
  - Chạy scripts:
    - Chuyển quyền sở hữu về cho quản lý
    - Chuyển quyền edit thành view
    - Tạo ss clone để theo dõi nội dung đã điền
