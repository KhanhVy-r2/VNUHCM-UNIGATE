import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function RegistrationForm() {
  // State để lưu dữ liệu form
  const [formData, setFormData] = useState({
    cccd: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // State để kiểm soát hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State cho checkbox
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [notRobot, setNotRobot] = useState(false);

  // State để hiển thị thông báo lỗi
  const [errors, setErrors] = useState({});
  
  // State để kiểm soát khi form được submit
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Xóa lỗi của trường vừa được cập nhật nếu form đã được submit trước đó
    if (formSubmitted) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Hàm xử lý thay đổi checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'agreeTerms') {
      setAgreeTerms(checked);
      if (formSubmitted && checked) {
        setErrors(prev => ({
          ...prev,
          agreeTerms: ''
        }));
      }
    } else if (name === 'notRobot') {
      setNotRobot(checked);
      if (formSubmitted && checked) {
        setErrors(prev => ({
          ...prev,
          notRobot: ''
        }));
      }
    }
  };

  // Hàm xác thực form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cccd) {
      newErrors.cccd = 'Vui lòng nhập số CCCD';
    }
    
    if (!formData.fullName) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }
    
    if (!agreeTerms) {
      newErrors.agreeTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }
    
    if (!notRobot) {
      newErrors.notRobot = 'Vui lòng xác nhận bạn không phải là robot';
    }
    
    return newErrors;
  };

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      // Xử lý đăng ký thành công
      alert('Đăng ký thành công!');
      console.log('Form data submitted:', formData);
      // Reset form sau khi đăng ký thành công
      setFormData({
        cccd: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
      setAgreeTerms(false);
      setNotRobot(false);
      setFormSubmitted(false);
      // Ở đây bạn có thể gửi API request đến server
    } else {
      setErrors(validationErrors);
    }
  };

  // Quyết định class cho input fields
  const getInputClassName = (fieldName) => {
    return `w-full p-3 rounded ${
      errors[fieldName] 
        ? 'border-2 border-red-500 bg-red-50 text-red-700' 
        : 'border border-gray-300 bg-white text-gray-800'
    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - Updated color to #0056B3 */}
      <header className="bg-[#0056B3] text-white px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-lg">VNUHCM - UNIGATE</div>
        <div className="font-bold text-lg flex-grow text-center">ĐĂNG KÍ TÀI KHOẢN</div>
        <div>
          <Link to="/" className="text-white hover:underline">
            Đã có tài khoản? Đăng nhập
          </Link>
        </div>
      </header>

      {/* Form Container */}
      <div className="flex-grow">
        <div className="max-w-3xl mx-auto my-6 bg-blue-50 p-8 rounded shadow-md w-full">
          <form onSubmit={handleSubmit}>
            {/* CCCD */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Số CCCD</label>
              <div className="flex-grow">
                <input
                  type="text"
                  name="cccd"
                  className={getInputClassName('cccd')}
                  placeholder="Nhập số CCCD"
                  value={formData.cccd}
                  onChange={handleChange}
                />
                {errors.cccd && <p className="text-red-500 text-sm mt-1 font-medium">{errors.cccd}</p>}
              </div>
            </div>

            {/* Họ và tên */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Họ và tên</label>
              <div className="flex-grow">
                <input
                  type="text"
                  name="fullName"
                  className={getInputClassName('fullName')}
                  placeholder="Nhập họ và tên"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1 font-medium">{errors.fullName}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Email</label>
              <div className="flex-grow">
                <input
                  type="email"
                  name="email"
                  className={getInputClassName('email')}
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>}
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Số điện thoại</label>
              <div className="flex-grow">
                <input
                  type="tel"
                  name="phone"
                  className={getInputClassName('phone')}
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1 font-medium">{errors.phone}</p>}
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Mật khẩu</label>
              <div className="flex-grow relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={getInputClassName('password')}
                  placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🔒' : '👁️'}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>}
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="mb-4 flex items-start">
              <label className="w-32 text-gray-700 mt-3 font-medium">Xác nhận mật khẩu</label>
              <div className="flex-grow relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={getInputClassName('confirmPassword')}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '🔒' : '👁️'}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 font-medium">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Checkbox Điều khoản */}
            <div className="mb-1 ml-32 flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                className={`mr-2 h-5 w-5 rounded border ${errors.agreeTerms ? 'border-2 border-red-500' : 'border-gray-300'}`}
                checked={agreeTerms}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="agreeTerms" className="text-gray-800">
                Tôi đồng ý với{' '}
                <a href="#" className="text-blue-700 hover:underline font-medium">Điều khoản sử dụng</a>{' '}
                và{' '}
                <a href="#" className="text-blue-700 hover:underline font-medium">Chính sách bảo mật</a>
              </label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm ml-32 mb-4 font-medium">{errors.agreeTerms}</p>}

            {/* Checkbox Not Robot */}
            <div className="mb-1 ml-32 flex items-center">
              <input
                type="checkbox"
                id="notRobot"
                name="notRobot"
                className={`mr-2 h-5 w-5 rounded border ${errors.notRobot ? 'border-2 border-red-500' : 'border-gray-300'}`}
                checked={notRobot}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="notRobot" className="text-gray-800">Tôi không phải là robot</label>
            </div>
            {errors.notRobot && <p className="text-red-500 text-sm ml-32 mb-4 font-medium">{errors.notRobot}</p>}

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#0056B3] text-white py-3 px-8 rounded font-bold hover:bg-blue-800 w-48 transition duration-300 shadow-md hover:shadow-lg"
              >
                ĐĂNG KÍ
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer - Added with color #0056B3 */}
      <footer className="bg-[#0056B3] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">VNUHCM - UNIGATE</h3>
              <p className="text-sm">Trường Đại học Công nghệ Thông tin</p>
              <p className="text-sm mt-2">Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Liên hệ</h3>
              <p className="text-sm">Email: support@vnuhcm.edu.vn</p>
              <p className="text-sm mt-2">Điện thoại: (028) 3724 2160</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Truy cập nhanh</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:underline">Trang chủ</a></li>
                <li><a href="#" className="text-sm hover:underline">Đăng nhập</a></li>
                <li><a href="#" className="text-sm hover:underline">Điều khoản sử dụng</a></li>
                <li><a href="#" className="text-sm hover:underline">Chính sách bảo mật</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-400 mt-6 pt-6 text-center text-sm">
            © 2025 VNUHCM-UNIGATE. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  );
}