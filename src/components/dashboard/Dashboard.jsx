import ProfileCard from './ProfileCard';
import ActionCard from './ActionCard';
import NewsCard from './NewsCard';
import Chatbot from './Chatbot';
import { Link } from 'react-router-dom'; 

export default function Dashboard() {
  const user = {
    name: "Nguyen Van A",
    email: "nguyenvana@student.edu.vn",
    phone: "0912345678",
  };

  const actionCards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 3H10V21H2V3Z" stroke="#FF9017" strokeWidth="2" />
          <path d="M12 3H20V21H12V3Z" stroke="#FF9017" strokeWidth="2" />
        </svg>
      ),
      title: "Bài thi thử ĐGNL",
      description: "Luyện tập và làm quen với format bài thi ĐGNL",
      buttonText: "Làm bài thi thử",
      buttonColor: "#FF9017",
      borderColor: "#FFB459",
      link: "/thi-thu", // Đường dẫn đến trang làm bài thi thử
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 4H21V20H3V4Z" stroke="#0056B3" strokeWidth="2"/>
          <path d="M3 2H21V10H3V2Z" stroke="#0056B3" strokeWidth="2"/>
        </svg>
      ),
      title: "Kỳ thi ĐGNL đợt 1",
      description: "Ngày thi: 30/03/2025",
      status: "Đã kết thúc",
      statusColor: "#EBF5FF",
      buttonText: "Xem kết quả",
      buttonColor: "#0056B3",
      borderColor: "#0056B3",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 4H21V20H3V4Z" stroke="#0056B3" strokeWidth="2"/>
          <path d="M3 2H21V10H3V2Z" stroke="#0056B3" strokeWidth="2"/>
        </svg>
      ),
      title: "Kỳ thi ĐGNL đợt 2",
      description: "Ngày thi: 01/06/2025",
      status: "Còn lại: 47 ngày 13 giờ",
      statusColor: "#EBF5FF",
      buttonText: "Đăng ký dự thi",
      buttonColor: "#0056B3",
      borderColor: "#0056B3",
    },
    {
      icon: (
        <svg width="24" height="23" viewBox="0 0 24 23" fill="none">
          <path d="M3 2.875H21V20.125H3V2.875Z" stroke="#9333EA" strokeWidth="2"/>
        </svg>
      ),
      title: "Tư vấn tuyển sinh",
      description: "Trò chuyện với Chatbot để nhận tư vấn",
      buttonText: "Bắt đầu trò chuyện",
      buttonColor: "#9333EA",
      borderColor: "#9333EA",
    },
    {
      icon: (
        <svg width="24" height="23" viewBox="0 0 24 23" fill="none">
          <path d="M2 1.91667H22V21.0833H2V1.91667Z" stroke="#6B7280" strokeWidth="2"/>
          <path d="M9 3.83333H15V13.4167H9V3.83333Z" stroke="#6B7280" strokeWidth="2"/>
        </svg>
      ),
      title: "Đăng ký xét tuyển",
      description: "Thời gian: 15/06 - 30/06/2025",
      status: "Còn lại: 61 ngày 13 giờ",
      statusColor: "#F3F4F6",
      buttonText: "Chưa đến thời gian đăng ký",
      buttonColor: "#E5E7EB",
      buttonTextColor: "#9CA3AF",
      borderColor: "#E5E7EB",
      disabled: true,
    },
  ];

  const newsItems = [
    {
      id: '1',
      image: "https://placehold.co/380x200",
      date: "15/03/2024",
      title: "Thông báo tuyển sinh năm học 2024-2025",
      description: "Đại học Quốc gia TP.HCM thông báo kế hoạch tuyển sinh đại học chính quy năm 2024 với nhiều phương thức xét tuyển mới.",
    },
    {
      id: '2',
      image: "https://placehold.co/380x200",
      date: "10/03/2024",
      title: "Hướng dẫn đăng ký dự thi ĐGNL",
      description: "Chi tiết các bước đăng ký dự thi đánh giá năng lực, những lưu ý quan trọng và thời gian biểu cụ thể.",
    },
    {
      id: '3',
      image: "https://placehold.co/380x200",
      date: "05/03/2024",
      title: "Thông tin ngành đào tạo mới",
      description: "Giới thiệu các ngành đào tạo mới được mở trong năm học 2024-2025 cùng cơ hội việc làm sau khi tốt nghiệp.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Welcome Section */}
      <div className="w-full h-[198px] bg-[#EBF5FF] relative">
        <div className="max-w-[1272px] mx-auto pt-10">
          <h1 className="text-[32px] font-bold text-[#0056B3] font-roboto leading-[48px]">
            Xin chào, {user.name}!
          </h1>
          <p className="mt-4 text-[18px] text-[#0056B3] font-roboto leading-[27px] max-w-[1161px]">
            Chào mừng bạn đến với hệ thống tuyển sinh trực tuyến của Đại học Quốc gia TP. Hồ Chí Minh.
          </p>
        </div>
      </div>

      {/* Action Cards - Row 1 */}
      <div className="max-w-[1272px] mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {actionCards.slice(0, 3).map((card, index) => (
          <ActionCard key={index} {...card} />
        ))}
      </div>

      {/* Action Cards - Row 2 */}
      <div className="max-w-[1272px] mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {actionCards.slice(3, 5).map((card, index) => (
          <ActionCard key={index} {...card} />
        ))}
      </div>

      {/* News Section */}
      <div className="max-w-[1272px] mx-auto mt-12">
        <h2 className="text-[32px] font-bold text-[#0056B3] font-roboto leading-[48px]">
          Tin tức mới nhất
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/news" // Điều hướng đến trang NewsPage
            className="w-[190px] h-[52px] bg-[#0056B3] text-white text-[16px] font-roboto font-bold rounded-md hover:bg-[#004a99] flex items-center justify-center mx-4"
          >
            Xem tất cả tin tức
          </Link>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}