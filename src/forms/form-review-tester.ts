import { FORM_FIELDS, TFormReview } from '@/types';

const formReviewTester: TFormReview = [
  // Tiêu chí 1
  {
    number: '1',
    title: 'Công việc đã hoàn thành và thành tích đã đạt được',
    criterions: [
      {
        number: '1.1',
        name: 'workPerformedAndAchievementsAchieved',
        title: '',
        type: FORM_FIELDS.MULTI_INPUT,
        isRequired: true,
      },
    ],
    description:
      'Cách điền: Nhân viên liệt kê các công việc chính và phụ theo thứ tự ưu tiên, ghi rõ các thành tích đạt được (Độ quan trọng, thời gian hoàn thành công việc,...)',
  },

  // Tiêu chí 2
  {
    number: '2',
    title: 'Đánh giá chung về kết quả công việc',
    criterions: [
      {
        number: '2.1',
        title: `Test Execution Productivites: Test Execution Productivites= (no of TC executed)/(effort spent for execution of TC)`,
        name: 'performanceReview.generalAssessmentOfResult.tcPreparationProductivity',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        description:
          'Chỉ số được sử dụng đo đạt cho Tổng số TC được chuẩn bị và công sức đã tiêu tốn để chuẩn bị các TC đó',
        scoreScale: [
          {
            score: 1,
            description: '1 - <11 TC/h',
          },
          {
            score: 2,
            description: '2 - Từ 11 - 18 TC/h',
          },
          {
            score: 3,
            description: `3 - Từ 18 - 25 TC/h`,
          },
          {
            score: 4,
            description: '4 - Từ 25- 38 TC/h',
          },
          {
            score: 5,
            description: '5 - >= 38 TC/h',
          },
        ],
      },
      {
        number: '2.2',
        title:
          'Test Execution Productivites: Test Execution Productivites= (no of TC executed)/(effort spent for execution of TC)',
        name: 'performanceReview.generalAssessmentOfResult.testExecutionProductivity',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        description:
          'Chỉ số dùng để đo đạt số lượng test case mà tester có thể thực thi trong 1h',
        scoreScale: [
          {
            score: 1,
            description: '1 - <9 TC/h',
          },
          {
            score: 2,
            description: '2 - Từ 9 - 15 TC/h',
          },
          {
            score: 3,
            description: '3 - Từ 15 - 21 TC/h',
          },
          {
            score: 4,
            description: '4 - Từ 21 - 31 TC/h',
          },
          {
            score: 5,
            description: '5 - >= 31 TC/h',
          },
        ],
      },
      {
        number: '2.3',
        title:
          'Test Design Coverage: Test Design Coverage= [Total number of requiments mapped]/Total number of requiment',
        name: 'performanceReview.generalAssessmentOfResult.testDesignCoverage',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        description:
          'Chỉ số dùng để đo đạt phần trăm TC thiết kế trên tổng số chức năng của requirement',
        scoreScale: [
          {
            score: 1,
            description: '1 - Thiếu so với requiment của dự án',
          },
          {
            score: 2,
            description: '2 - Đủ số lượng requiment của dự án',
          },
          {
            score: 3,
            description:
              '3 - Đủ số lượng requiment của dự án và có thêm edge case',
          },
        ],
      },
      {
        number: '2.4',
        title: 'Defect Leakag',
        name: 'performanceReview.generalAssessmentOfResult.defectLeakag',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        description:
          'Chỉ tiêu được sử dụng để review lại tính hiệu quả , chất lượng của quy trình testing trước khi đưa lên môi trường UAT',
        scoreScale: [
          {
            score: 1,
            description:
              '1 - Kiểm thử kém hiệu quả, tỷ lệ lọt bug cao và/hoặc có bug nghiêm trọng.',
          },
          {
            score: 2,
            description:
              '2 - Kiểm thử ở mức chấp nhận được, tỷ lệ lọt bug cao nhưng không nghiêm trong.',
          },
          {
            score: 3,
            description:
              '3 - Kiểm thử rất hiệu quả, rất ít lỗi lọt qua giai đoạn kiểm thử.',
          },
        ],
      },
      {
        number: '2.5',
        title: 'Tính chủ động, sáng kiến trong công việc',
        name: 'performanceReview.generalAssessmentOfResult.proactiveAndCreativeAtWork',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 1,
            description:
              '1 - Không sẵn sàng, không chủ động, miễn cưỡng nhận công việc và luôn cần được chỉ bảo điều phải làm. Thiếu sự quyết tâm theo đuổi mục tiêu công việc, thiếu trách nhiệm trong công việc. Ngại thay đổi, không có ý thức đổi mới, cải tiến trong công việc, rập khuôn, máy móc.',
          },
          {
            score: 2,
            description:
              '2 - Làm việc tốt dưới sự hướng dẫn chặt chẽ nhưng không sẵn sàng nhận thêm trách nhiệm. Lúng túng khi xử lý các vấn đề khó hoặc các khó khăn khác thường. Cần sự động viên liên tục, khả năng phát triển các ý tưởng mới còn kém, kể cả khi có định hướng.',
          },
          {
            score: 3,
            description:
              '3 - Chủ động thực hiện các công việc trong chức trách nhiệm vụ. Đáp ứng được yêu cầu hoặc đôi lúc vượt trên mức yêu cầu của công việc. Thực hiện tốt các công việc theo khuôn mẫu định sẵn. Có khả năng tư duy và hành động hiệu quả. Khi được định hướng có thể phát huy sáng tạo phương pháp mới để cải thiện công việc.',
          },
          {
            score: 4,
            description:
              '4 - Nỗ lực một cách tự tin, chủ động hành động để giải quyết các vấn đề khó khăn và đề nghị các giải pháp có thể thực hiện được. Có ý chí vươn lên và quyết tâm thông qua sự sẵn sàng nhận thêm trách nhiệm khác. Luôn có khả năng tư duy sáng tạo, ý thức đổi mới, cải tiến công việc. Thỉnh thoảng có đề xuất sáng kiến hay, có sáng kiến được đánh giá tốt và được áp dụng',
          },
          {
            score: 5,
            description:
              '5 - Cống hiến xuất sắc cho công ty thông qua sáng kiến mang tính đột phá, được công nhận và áp dụng tạo ra lợi nhuận cao. Thường xuyên chủ động kiến nghị những cải tiến về thủ tục, quy trình, phương pháp làm việc mang lại hiệu quả cao.',
          },
        ],
      },
    ],
  },

  // Tiêu chí 3
  {
    number: '3',
    title: 'Kĩ năng trong công việc',
    criterions: [
      {
        number: '3.1',
        title: 'Kĩ năng làm việc nhóm',
        name: 'performanceReview.skillsAtWork.teamWorking',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 1,
            description:
              '1 - Không hợp tác với đồng nghiệp, luôn cư xử với đồng nghiệp không hòa nhã. Rất ít khi giúp đỡ người khác. Thường tạo sự cách biệt với đồng nghiệp. Không chia sẻ thông tin, hiểu biết về công việc với đồng nghiệp.',
          },
          {
            score: 2,
            description:
              '2 - Gặp khó khăn trong việc thiết lập mối quan hệ với đồng nghiệp, thể hiện: Thường xảy ra bất đồng với đồng nghiệp hoặc không chú ý tới điều đó. Chỉ giúp người khác khi được cấp trên yêu cầu, thiếu nhiệt tình hỗ trợ đồng nghiệp. Đặt quyền lợi của cá nhân lên trên. Chỉ chia sẻ thông tin, hiểu biết về công việc với đồng nghiệp khi cấp trên yêu cầu.',
          },
          {
            score: 3,
            description:
              '3 - Khả năng thiết lập mối quan hệ công tác với đồng nghiệp ở mức vừa phải để hoàn thành công việc được giao. Có thái độ sẵn sàng khi được yêu cầu phối hợp và chia sẻ kinh nghiệm, kiến thức. Có tinh thần chia sẻ thông tin, kiến thức với đồng nghiệp.',
          },
          {
            score: 4,
            description:
              '4 - Rất cộng tác và sẵn sàng giúp đỡ người khác, thể hiện: Chủ động làm quen với tất cả nhân viên trong bộ phận và chủ động tham gia xây dựng bầu không khí làm việc tích cực. Tham gia tích cực vào hoạt động của nhóm, giúp nhóm tạo ra các kết quả, đạt hiệu quả. Đặt lợi ích của nhóm lên trên lợi ích của bản thân. Chủ động chia sẻ thông tin, kiến thức về công việc với đồng nghiệp.',
          },
          {
            score: 5,
            description:
              '5 - Rất chuyên nghiệp trong việc xây dựng mối quan hệ lâu dài. Chủ động khuyến khích tinh thần làm việc bên trong và bên ngoài bộ phận, thể hiện: Luôn nhiệt tình hợp tác và tạo được sự tin tưởng trong nhóm. Có thiện chí trong công việc, cố gắng phát triển sự hòa hợp. Giải quyết hiệu quả các mối quan hệ bất đồng làm việc nhóm, sử dụng tốt các mối quan hệ. Chủ động hướng dẫn, giúp đỡ đồng nghiệp để thực hiện công việc hiệu quả.',
          },
        ],
      },
      {
        number: '3.2',
        title: 'Kỹ năng giao tiếp và truyền đạt thông tin',
        name: 'performanceReview.skillsAtWork.communicationAndInformationDissemination',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 1,
            description:
              '1 - Khả năng trình bày rất kém hoặc rất miễn cưỡng thể hiện khó hiểu, dài dòng, lủng củng, không diễn đạt đúng nội dung chính cần thể hiện (bao gồm nói và viết); Không biết cách diễn đạt ý thành văn bản.',
          },
          {
            score: 2,
            description:
              '2 - Có khó khăn trong việc diễn đạt (nói và viết). Diễn đạt thiếu rõ ràng và thiếu tính thuyết phục. Khả năng trình bày văn bản còn hạn chế về nội dung và hình thức, thể thức trình bày.',
          },
          {
            score: 3,
            description:
              '3 - Kỹ năng giao tiếp đạt yêu cầu thể hiện: Diễn đạt lưu loát, rõ ràng có tính thuyết phục; Kỹ năng viết, soạn thảo các văn bản cấp trên yêu cầu đủ nội dung các ý cần diễn đạt; Trình bày đúng quy định về thể thức, tuy nhiên cần có hướng dẫn định hướng.',
          },
          {
            score: 4,
            description:
              '4 - Diễn đạt rất lưu loát, rất rõ ràng, thể hiện: Có tính thuyết phục cao; Có thể giải thích những ý tưởng phức tạp bằng ngôn từ thông dụng dễ hiểu (gồm cả nói và viết), văn phong tốt, trình bày đúng thể thức quy định.',
          },
          {
            score: 5,
            description:
              '5 - Kỹ năng diễn đạt xuất sắc thể hiện: Có thể trình bày tự tin ngay cả trước đám đông và có tính thuyết phục trước cả với cán bộ cao cấp. Văn phong viết tốt, ngắn gọn, xúc tích, sáng sủa, dễ hiểu, rõ ràng, trình bày đẹp và đúng quy định.',
          },
        ],
      },
      {
        number: '3.3',
        title: 'Kỹ năng giải quyết vấn đề',
        name: 'performanceReview.skillsAtWork.problemSolving',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 1,
            description:
              '1 - Không thể nhận biết hoặc giải quyết vấn đề; không cho thấy bằng chứng về kỹ năng phân tích cần thiết.',
          },
          {
            score: 2,
            description:
              '2 - Gặp khó khăn trong việc nhận biết và giải quyết các vấn đề thường ngày; kỹ năng phân tích cần cải thiện.',
          },
          {
            score: 3,
            description:
              '3 - Giải quyết thỏa đáng các vấn đề thường ngày; yêu cầu hỗ trợ với các vấn đề phức tạp.',
          },
          {
            score: 4,
            description:
              '4 - Thể hiện kỹ năng giải quyết vấn đề tốt; đôi khi có thể giải quyết được những vấn đề phức tạp.',
          },
          {
            score: 5,
            description:
              '5 - Luôn thể hiện kỹ năng giải quyết vấn đề xuất sắc; có khả năng giải quyết các vấn đề phức tạp một cách sáng tạo.',
          },
        ],
      },
      {
        number: '3.4',
        title: 'Kỹ năng quản lý thời gian/Quản lý task',
        name: 'performanceReview.skillsAtWork.timeManagementSkillsAndTaskManagement',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 1,
            description:
              '1 - Kế hoạch của bản thân chưa đáp ứng yêu cầu của công việc, thể hiện: Luôn không đúng giờ. Công việc không được tổ chức và bản thân không phân biệt được mức độ ưu tiên giữa các công việc; Không biết sắp xếp hồ sơ, tài liệu và quản lý thông tin trong công việc.',
          },
          {
            score: 2,
            description:
              '2 - Kế hoạch của bản thân đáp ứng phần lớn yêu cầu của công việc, thể hiện: Chấp hành giờ giấc một vài lần chưa tốt; Thường thấy khó khăn trong việc truy xuất thông tin hoặc hồ sơ. Công việc, hồ sơ tài liệu, quản lý thông tin công việc chưa được sắp xếp ngăn nắp, không khoa học.',
          },
          {
            score: 3,
            description:
              '3 - Kế hoạch của bản thân đáp ứng yêu cầu của công việc, thể hiện: Chấp hành giờ giấc nghiêm túc. Sắp xếp công việc, hồ sơ tài liệu, quản lý thông tin công việc đạt yêu cầu.',
          },
          {
            score: 4,
            description:
              '4 - Kế hoạch của bản thân đáp ứng trên yêu cầu của công việc, thể hiện: Luôn đúng giờ và tổ chức tốt công việc. Biết chính xác nơi hồ sơ, tài liệu lưu trữ và quản lý thông tin công việc khoa học; Biết cách lập kế hoạch làm việc khoa học.',
          },
          {
            score: 5,
            description:
              '5 - Kế hoạch của bản thân đáp ứng yêu cầu của công việc rất tốt thể hiện: Gương mẫu trong việc chấp hành giờ giấc; Tổ chức công việc rất khoa học. Luôn có ý thức cải tiến việc quản lý hồ sơ, tài liệu lưu trữ và quản lý thông tin công việc; Thường xuyên giúp bộ phận lập kế hoạch hoạt động. Có thể hoạch định, dự đoán, tiên liệu trước các công việc cần thực hiện.',
          },
        ],
      },
    ],
  },

  // Tiêu chí 4
  {
    number: '4',
    title: 'Thái độ và ý thức',
    criterions: [
      {
        number: '4.1',
        title: 'Tính kỷ luật, tuân thủ',
        name: 'performanceReview.attitudeAndConsciousness.disciplineAndCompliance',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 1,
            description:
              '1 - Chưa nghiêm túc thực hiện các quy định của Công ty và đội nhóm, cần giám sát nhắc nhở thêm',
          },
          {
            score: 2,
            description:
              '2 - Chấp hành tương đối tốt các quy định của Công ty và đội nhóm',
          },
          {
            score: 3,
            description:
              '3 - Chấp hành tốt các quy định của Công ty và đội nhóm',
          },
          {
            score: 4,
            description:
              '4 - Chấp hành rất tốt các quy định của Công ty và đội nhóm',
          },
          {
            score: 5,
            description:
              '5 - Chấp hành tốt các quy định của Công ty và đội nhóm, có những đóng góp tích cực trong việc xây dựng quy định, quy chế Công ty/ Đội nhóm',
          },
        ],
      },
      {
        number: '4.2',
        title:
          'Sẵn sàng tham gia các công việc, dự án, các hoạt động chung của Công ty (ngoài công việc chuyên môn)',
        name: 'performanceReview.attitudeAndConsciousness.generalActivities',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 1,
            description: '1 - Không sẵn sàng, không tham gia',
          },
          {
            score: 2,
            description: '2 - Thỉnh thoảng tham gia',
          },
          {
            score: 3,
            description: '3 - Luôn sẵn sàng tham gia khi được chỉ định',
          },
          {
            score: 4,
            description:
              '4 - Luôn sẵn sàng tham gia và nhận task phù hợp mà không cần chỉ định.',
          },
          {
            score: 5,
            description:
              '5 - Luôn sẵn sàng tham gia và có những đóng góp tích cực trong việc xây dựng/tổ chức các hoạt động',
          },
        ],
      },
    ],
  },

  // Tiêu chí 5
  {
    number: '5',
    title: 'Bổ sung khác',
    description: 'chỉ QLTT đánh giá , tổng điểm tối đa 1,5',
    isForManager: true,
    criterions: [
      {
        number: '5.1',
        title:
          'Khen thưởng nội bộ hoặc giải thưởng từ đơn vị chuyên môn/khách hàng.',
        name: 'bonus.internalCommendationOrAwardFromCustomer',
        type: FORM_FIELDS.SCORE_INPUT,
        isRequired: true,
      },
      {
        number: '5.2',
        title:
          'Nỗ lực đáng kể cho những nhiệm vụ rất khó khăn so với level hiện tại, mặc dù thành tích chưa rõ ràng.',
        name: 'bonus.considerableEffort',
        type: FORM_FIELDS.SCORE_INPUT,
        isRequired: true,
      },
    ],
  },

  {
    number: '6',
    title: 'Ý kiến, đề xuất của nhân viên',
    notForManager: true,
    criterions: [
      {
        number: '6.1',
        title: 'Thuận lợi/Điểm mạnh',
        name: 'opinionAndSuggestions.strongPoints',
        type: FORM_FIELDS.TEXTAREA,
        isRequired: true,
      },
      {
        number: '6.2',
        title: 'Khó khăn/Điểm yếu',
        name: 'opinionAndSuggestions.weakness',
        type: FORM_FIELDS.TEXTAREA,
        isRequired: true,
      },
      {
        number: '6.3',
        title: 'Kế hoạch cho sự phát triển nghề nghiệp của bản thân',
        name: 'opinionAndSuggestions.plans',
        type: FORM_FIELDS.TABLE,
        isRequired: true,
      },
      {
        number: '6.4',
        title: 'Đề xuất khác (nếu có)',
        name: 'opinionAndSuggestions.otherSuggestions',
        type: FORM_FIELDS.TEXTAREA,
      },
    ],
  },

  // Tiêu chí 7
  {
    number: '7',
    title: 'Nhận xét, đánh giá của quản lý',
    isForManager: true,
    criterions: [
      {
        number: '7.1',
        title: 'Nhận xét, đánh giá thêm',
        name: 'comment',
        type: FORM_FIELDS.TEXTAREA,
        isRequired: true,
      },
    ],
  },
];

export default formReviewTester;
