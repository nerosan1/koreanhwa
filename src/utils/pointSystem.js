// Hệ thống điểm số theo bảng phân quyền
export const POINT_SYSTEM = {
  // Cấp độ học viên
  STUDENT_LEVELS: {
    BEGINNER: {
      name: 'Sơ cấp',
      minPoints: 0,
      maxPoints: 300,
      description: 'Người mới bắt đầu (0-300 điểm)',
      quizConfig: {
        type: 'TOPIK I',
        questions: 20,
        maxPoints: 100
      },
      contentAccess: {
        basicExplanation: { cost: 5, description: 'Giải thích câu hỏi cơ bản' },
        hangeulMaterials: { cost: 10, description: 'Tài liệu Hangeul' },
        pronunciationVideos: { cost: 15, description: 'Video phát âm' }
      },
      learningGoals: [
        'Học bảng chữ cái Hangeul',
        'Từ vựng cơ bản (500 từ)',
        'Giao tiếp đơn giản',
        'Tích lũy điểm để mở khóa nội dung'
      ]
    },
    INTERMEDIATE: {
      name: 'Trung cấp',
      minPoints: 301,
      maxPoints: 800,
      description: 'Đã có nền tảng (301-800 điểm)',
      quizConfig: {
        type: 'TOPIK I & II',
        questions: 50,
        maxPoints: 300
      },
      contentAccess: {
        grammarExplanation: { cost: 8, description: 'Giải thích ngữ pháp' },
        specializedVocabulary: { cost: 20, description: 'Tài liệu từ vựng chuyên ngành' },
        conversationVideos: { cost: 25, description: 'Video hội thoại' },
        aiChat: { cost: 30, duration: 10, description: 'Chat với AI (10 phút)' }
      },
      learningGoals: [
        'Thành thạo 1500 từ vựng',
        'Ngữ pháp cơ bản-trung cấp',
        'Luyện nghe nói qua AI',
        'Chuẩn bị thi TOPIK I'
      ]
    },
    ADVANCED: {
      name: 'Cao cấp',
      minPoints: 801,
      maxPoints: Infinity,
      description: 'Trình độ khá (801+ điểm)',
      quizConfig: {
        type: 'TOPIK II',
        questions: 50,
        maxPoints: 300
      },
      contentAccess: {
        grammarExplanation: { cost: 12, description: 'Giải thích ngữ pháp' },
        specializedVocabulary: { cost: 35, description: 'Tài liệu từ vựng chuyên ngành' },
        conversationVideos: { cost: 40, description: 'Video hội thoại' },
        aiChat: { cost: 50, duration: 10, description: 'Chat với AI (10 phút)' }
      },
      learningGoals: [
        'Thành thạo 3000+ từ vựng',
        'Ngữ pháp nâng cao',
        'Đạt TOPIK II cấp 4-6',
        'Giao tiếp lưu loát'
      ]
    }
  },

  // Admin quyền hạn
  ADMIN_PERMISSIONS: {
    userManagement: 'Quản lý người dùng',
    permissionAssignment: 'Phân quyền',
    scoreMonitoring: 'Theo dõi điểm số học viên',
    contentManagement: 'Quản lý nội dung',
    paymentProcessing: 'Xử lý thanh toán',
    statisticalReports: 'Tạo báo cáo thống kê',
    adjustPointCosts: 'Điều chỉnh giá điểm cho từng tính năng'
  },

  // Guest user
  GUEST_USER: {
    name: 'Khách',
    description: 'Trải nghiệm một số chức năng cơ bản mà không cần đăng ký tài khoản (hoặc chỉ dùng tài khoản miễn phí) trước khi quyết định có mua bản premium hay không',
    capabilities: [
      'Khám phá và đánh giá giá trị sản phẩm/dịch vụ trước khi quyết định đăng ký (hoặc thanh toán)'
    ]
  },

  // Cấu hình giá điểm cho từng loại nội dung
  CONTENT_PRICING: {
    video: {
      beginner: { base: 15, max: 20 },
      intermediate: { base: 20, max: 30 },
      advanced: { base: 25, max: 40 }
    },
    vocabulary: {
      beginner: { base: 10, max: 15 },
      intermediate: { base: 15, max: 25 },
      advanced: { base: 20, max: 35 }
    },
    grammar: {
      beginner: { base: 12, max: 18 },
      intermediate: { base: 18, max: 28 },
      advanced: { base: 25, max: 40 }
    },
    exercise: {
      beginner: { base: 8, max: 12 },
      intermediate: { base: 12, max: 20 },
      advanced: { base: 18, max: 30 }
    }
  },

  // Hệ thống thưởng điểm
  REWARD_SYSTEM: {
    dailyLogin: 5,
    completeLesson: 10,
    passQuiz: 20,
    streakBonus: {
      3: 5,
      7: 15,
      14: 30,
      30: 50
    },
    achievementBonus: {
      firstQuiz: 50,
      firstLesson: 25,
      weekStreak: 100,
      monthStreak: 500
    }
  }
};

// Hàm tiện ích
export const getStudentLevel = (points) => {
  if (points >= POINT_SYSTEM.STUDENT_LEVELS.ADVANCED.minPoints) {
    return POINT_SYSTEM.STUDENT_LEVELS.ADVANCED;
  } else if (points >= POINT_SYSTEM.STUDENT_LEVELS.INTERMEDIATE.minPoints) {
    return POINT_SYSTEM.STUDENT_LEVELS.INTERMEDIATE;
  } else {
    return POINT_SYSTEM.STUDENT_LEVELS.BEGINNER;
  }
};

export const canAccessContent = (userPoints, contentCost, userLevel) => {
  return userPoints >= contentCost;
};

export const calculateContentPrice = (type, level, isPremium = false) => {
  const pricing = POINT_SYSTEM.CONTENT_PRICING[type]?.[level];
  if (!pricing) return 0;
  
  return isPremium ? pricing.max : pricing.base;
};

export const getNextLevelPoints = (currentPoints) => {
  const currentLevel = getStudentLevel(currentPoints);
  
  if (currentLevel === POINT_SYSTEM.STUDENT_LEVELS.ADVANCED) {
    return null; // Đã ở cấp cao nhất
  }
  
  return currentLevel === POINT_SYSTEM.STUDENT_LEVELS.BEGINNER 
    ? POINT_SYSTEM.STUDENT_LEVELS.INTERMEDIATE.minPoints
    : POINT_SYSTEM.STUDENT_LEVELS.ADVANCED.minPoints;
};

export const getProgressToNextLevel = (currentPoints) => {
  const currentLevel = getStudentLevel(currentPoints);
  const nextLevelPoints = getNextLevelPoints(currentPoints);
  
  if (!nextLevelPoints) {
    return { progress: 100, current: currentPoints, target: 'Max' };
  }
  
  const progress = ((currentPoints - currentLevel.minPoints) / (nextLevelPoints - currentLevel.minPoints)) * 100;
  
  return {
    progress: Math.min(progress, 100),
    current: currentPoints - currentLevel.minPoints,
    target: nextLevelPoints - currentLevel.minPoints
  };
};
