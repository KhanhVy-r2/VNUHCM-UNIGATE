import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parse, isAfter } from 'date-fns';
import HeaderDangNhap from '../../components/HeaderDangNhap';
import Footer from '../../components/Footer';

const getLocationName = (locationValue) => {
  switch (locationValue) {
    case 'khanh-hoa':
      return 'Khánh Hòa';
    case 'ho-chi-minh':
      return 'Hồ Chí Minh';
    case 'ha-noi':
      return 'Hà Nội';
    default:
      return locationValue;
  }
};

const ExamSchedulePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendedMajors, setRecommendedMajors] = useState([]);

  const exams = [
    {
      id: 1,
      title: 'Kỳ thi ĐGNL đợt 1 năm 2024',
      date: '20/01/2024',
      registrationPeriod: '03/01/2024 - 15/01/2024',
      status: 'Hết hạn đăng ký',
      hasResult: true,
      scores: {
        total: 1064,
        vietnamese: 264,
        english: 276,
        math: 255,
        logic: 108,
        science: 161,
      },
    },
    {
      id: 2,
      title: 'Kỳ thi ĐGNL đợt 2 năm 2024',
      date: '15/03/2024',
      registrationPeriod: '03/01/2024 - 15/01/2024',
      status: 'Hết hạn đăng ký',
      hasResult: false,
    },
  ];

  const currentDate = new Date('2025-04-17');
  const registeredExams = JSON.parse(localStorage.getItem('registeredExams')) || [];

  const handleRegister = (exam) => {
    navigate(`/dang-ky/${exam.id}`, { state: { title: exam.title, date: exam.date } });
  };

  const handleAdjust = (exam) => {
    navigate(`/dang-ky/${exam.id}`, { state: { title: exam.title, date: exam.date } });
  };

  const handlePayment = (exam) => {
    const registeredExam = registeredExams.find((re) => re.examId === exam.id.toString());
    const updatedRegistrationData = {
      ...registeredExam,
      isPaid: true,
    };

    const updatedExams = registeredExams.map((re) =>
      re.examId === exam.id.toString() ? updatedRegistrationData : re
    );
    localStorage.setItem('registeredExams', JSON.stringify(updatedExams));

    navigate('/payment-success', { state: { registrationData: updatedRegistrationData } });
  };

  const handleDownloadTicket = () => {
    alert('Tải giấy báo dự thi...');
  };

  const handleDownloadResult = () => {
    alert('Tải kết quả thi...');
  };

  const handleRequestReview = () => {
    alert('Đăng ký phúc khảo...');
  };

  const handleRecommendMajor = () => {
    const majors = [
      {
        code: '7480201',
        name: 'Công nghệ thông tin',
        school: 'ĐH Công nghệ thông tin - ĐHQG TPHCM',
        previousScore: 950,
      },
      {
        code: '7480101',
        name: 'Khoa học máy tính',
        school: 'ĐH Bách khoa - ĐHQG TPHCM',
        previousScore: 925,
      },
      {
        code: '7340101',
        name: 'Quản trị kinh doanh',
        school: 'ĐH Kinh tế - Luật ĐHQG TPHCM',
        previousScore: 900,
      },
      {
        code: '7340115',
        name: 'Marketing',
        school: 'ĐH Kinh tế - Luật ĐHQG TPHCM',
        previousScore: 875,
      },
      {
        code: '7720101',
        name: 'Y khoa',
        school: 'ĐH Khoa học tự nhiên - ĐHQG TPHCM',
        previousScore: 990,
      },
    ];
    setRecommendedMajors(majors);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <div className="relative w-full max-w-[1200px] mx-auto flex-grow py-6 px-4">
        {exams.some(
          (exam) =>
            registeredExams.some((re) => re.examId === exam.id.toString() && re.isPaid) &&
            exam.hasResult
        ) ? (
          <>
            <div className="w-full bg-[#F0FDF4] border-l-4 border-[#059669] p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-[#059669] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <h2 className="text-[#059669] text-lg font-bold">Kết quả kỳ thi đã được công bố!</h2>
                  <p className="text-[#059669] text-sm">Kết quả Kỳ thi ĐGNL đợt 1 năm 2024 đã có. Xem ngay bên dưới.</p>
                </div>
              </div>
            </div>
            {exams
              .filter(
                (exam) =>
                  registeredExams.some((re) => re.examId === exam.id.toString() && re.isPaid) &&
                  exam.hasResult
              )
              .map((exam) => (
                <div key={exam.id} className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-black">{exam.title}</h3>
                      <p className="text-sm text-gray-500 mt-2">Ngày thi: {exam.date}</p>
                    </div>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <button
                        className="px-4 py-2 border border-[#0056B3] text-[#0056B3] text-sm font-bold rounded hover:bg-[#F3F4F6] transition"
                        onClick={handleRecommendMajor}
                      >
                        Khuyến nghị ngành học
                      </button>
                      <button
                        className="px-4 py-2 border border-[#0056B3] text-[#0056B3] text-sm font-bold rounded hover:bg-[#F3F4F6] transition"
                        onClick={handleDownloadResult}
                      >
                        Tải kết quả thi
                      </button>
                      <button
                        className="px-4 py-2 bg-[#0056B3] text-white text-sm font-bold rounded hover:bg-[#003F8A] transition"
                        onClick={handleRequestReview}
                      >
                        Đăng ký phúc khảo
                      </button>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-500">Tổng điểm</p>
                    <p className="text-4xl font-bold text-[#059669]">{exam.scores.total}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Tiếng Việt</span>
                        <span className="text-sm text-[#059669] font-bold">Điểm đạt được: {exam.scores.vietnamese}/300</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-2 bg-[#059669] rounded-full"
                          style={{ width: `${(exam.scores.vietnamese / 300) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Tiếng Anh</span>
                        <span className="text-sm text-[#059669] font-bold">Điểm đạt được: {exam.scores.english}/300</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-2 bg-[#059669] rounded-full"
                          style={{ width: `${(exam.scores.english / 300) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Toán học</span>
                        <span className="text-sm text-[#059669] font-bold">Điểm đạt được: {exam.scores.math}/300</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-2 bg-[#059669] rounded-full"
                          style={{ width: `${(exam.scores.math / 300) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Logic và phân tích số liệu</span>
                        <span className="text-sm text-[#059669] font-bold">Điểm đạt được: {exam.scores.logic}/120</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-2 bg-[#059669] rounded-full"
                          style={{ width: `${(exam.scores.logic / 120) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Suy luận khoa học</span>
                        <span className="text-sm text-[#059669] font-bold">Điểm đạt được: {exam.scores.science}/180</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-2 bg-[#059669] rounded-full"
                          style={{ width: `${(exam.scores.science / 180) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-600 text-sm mt-4">
                    Kết quả này có giá trị trong vòng 1 năm kể từ ngày thi.
                  </p>
                </div>
              ))}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-black mb-6">Kỳ thi sắp diễn ra</h2>
            {exams.length === 0 ? (
              <p className="text-center text-gray-500">Hiện tại chưa có kỳ thi nào.</p>
            ) : (
              <div className="space-y-6">
                {exams.map((exam) => {
                  const [startDate, endDate] = exam.registrationPeriod
                    .split(' - ')
                    .map((date) => parse(date.trim(), 'dd/MM/yyyy', new Date()));
                  const isRegistrationClosed = isAfter(currentDate, endDate);

                  const registeredExam = registeredExams.find(
                    (re) => re.examId === exam.id.toString()
                  );
                  const isRegistered = !!registeredExam;
                  const isPaid = registeredExam?.isPaid;

                  return (
                    <div
                      key={exam.id}
                      className="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-black">{exam.title}</h3>
                          <p className="text-sm text-gray-500 mt-2">Ngày thi: {exam.date}</p>
                          <p className="text-sm text-gray-500">
                            Thời gian đăng ký thi: {exam.registrationPeriod}
                          </p>
                          {isRegistered && (
                            <>
                              <p className="text-sm text-gray-500">
                                Mã hồ sơ dự thi: {registeredExam.profileCode}
                              </p>
                              <p className="text-sm text-gray-500">
                                Địa điểm dự thi: {getLocationName(registeredExam.examLocation)}
                              </p>
                              <p className="text-sm text-gray-500">
                                Tình trạng thanh toán:{' '}
                                <span className={isPaid ? 'text-green-500' : 'text-red-500'}>
                                  {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-2 mt-4 sm:mt-0">
                          <span
                            className={`px-4 py-1 text-sm rounded-full bg-gray-200 text-black flex items-center justify-center`}
                          >
                            {isRegistrationClosed ? 'Hết hạn đăng ký' : 'Sắp diễn ra'}
                          </span>
                          {isRegistered ? (
                            isPaid ? (
                              <button
                                className="px-4 py-2 bg-blue-700 text-white text-sm font-bold rounded hover:bg-blue-800 transition"
                                onClick={handleDownloadTicket}
                              >
                                Tải giấy báo dự thi
                              </button>
                            ) : (
                              <div className="flex space-x-2">
                                <button
                                  className="px-4 py-2 bg-blue-700 text-white text-sm font-bold rounded hover:bg-blue-800 transition"
                                  onClick={() => handleAdjust(exam)}
                                >
                                  Điều chỉnh
                                </button>
                                <button
                                  className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-600 transition"
                                  onClick={() => handlePayment(exam)}
                                >
                                  Thanh toán
                                </button>
                              </div>
                            )
                          ) : !isRegistrationClosed ? (
                            <button
                              aria-label={`Đăng ký kỳ thi ${exam.title}`}
                              className="px-4 py-2 bg-[#0056B3] text-white text-sm font-bold rounded hover:bg-[#004494] transition"
                              onClick={() => handleRegister(exam)}
                            >
                              Đăng ký
                            </button>
                          ) : (
                            <p className="text-sm text-red-500 font-medium">
                              Không thể đăng ký
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        <h2 className="text-xl font-bold text-black mt-8 mb-6">Kỳ thi sắp tới</h2>
        <div className="space-y-6">
          {exams
            .filter((exam) => !exam.hasResult)
            .map((exam) => (
              <div
                key={exam.id}
                className="w-full p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-black">{exam.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">Ngày thi: {exam.date}</p>
                    <p className="text-sm text-gray-500">
                      Số lượng: 2500 Đã đăng ký: 0
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2 mt-4 sm:mt-0">
                    <span className="px-4 py-1 text-sm rounded-full bg-gray-200 text-black flex items-center justify-center">
                      Sắp diễn ra
                    </span>
                    <button
                      className="px-4 py-2 bg-blue-700 text-white text-sm font-bold rounded hover:bg-blue-800 transition"
                      onClick={() => handleRegister(exam)}
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-md p-6 z-50 flex flex-col justify-between w-[640px] max-h-[80vh] overflow-y-auto">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Khuyến nghị ngành học
              </h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-sm font-semibold text-gray-700">Mã ngành</th>
                      <th className="p-3 text-sm font-semibold text-gray-700">Tên ngành</th>
                      <th className="p-3 text-sm font-semibold text-gray-700">Tên trường</th>
                      <th className="p-3 text-sm font-semibold text-gray-700">Điểm chuẩn năm trước</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendedMajors.map((major, index) => (
                      <tr
                        key={index}
                        className={`border-b border-gray-200 hover:bg-gray-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="p-3 text-sm text-gray-900">{major.code}</td>
                        <td className="p-3 text-sm text-gray-900">{major.name}</td>
                        <td className="p-3 text-sm text-gray-900">{major.school}</td>
                        <td className="p-3 text-sm text-gray-900">{major.previousScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-blue-600 text-sm mt-4 italic">
                Lưu ý: Khuyến nghị này dựa trên kết quả thi của thí sinh và chỉ mang tính chất tham khảo.
              </p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded font-medium hover:bg-gray-100 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamSchedulePage;