export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(Number(num))) return "";

  // Chuyển số thành chuỗi để xử lý phần thập phân
  const numStr = num.toString();
  const parts = numStr.split('.'); // Tách phần nguyên và phần thập phân

  let integerPart = parts[0];
  let fractionalPart = parts[1];

  // Thêm dấu phẩy mỗi 3 chữ số từ phải sang trái (kiểu quốc tế)
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

export const prepareIncomeLineChartData = (transactions) => {
  if (!Array.isArray(transactions)) return [];

  const grouped = {};

  transactions.forEach((item) => {
    const date = item.date;

    if (!grouped[date]) {
      grouped[date] = {
        date,
        totalAmount: 0,
        items: [],
        month: formatDayMonth(date), // '6th Jul', etc.
      };
    }

    grouped[date].totalAmount += item.amount;
    grouped[date].items.push(item);
  });

  // Convert object -> array & sort by date ascending
  const result = Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
  return result;
};

// Helper function to format '2025-07-28' => '28th Jul'
const formatDayMonth = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' }); // 'Jul'
  return `${day}${getDaySuffix(day)} ${month}`;
};

// Add suffix to day (1st, 2nd, 3rd, 4th...)
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

