import { FORM_FIELDS, TFormReview } from "@/types";

const formReviewGeneral: TFormReview = [
  // Tiêu chí 1
  {
    number: "1",
    title: "Công việc đã hoàn thành và thành tích đã đạt được",
    criterions: [
      {
        number: "1.1",
        name: "workPerformedAndAchievementsAchieved",
        title: "",
        type: FORM_FIELDS.MULTI_INPUT,
      },
    ],
    description:
      "Cách điền: Nhân viên liệt kê các công việc chính và phụ theo thứ tự ưu tiên, ghi rõ các thành tích đạt được (Độ quan trọng, thời gian hoàn thành công việc,...)",
  },

  // Tiêu chí 2
  {
    number: "2",
    title: "Đánh giá chung về kết quả công việc",
    criterions: [
      {
        number: "2.1",
        title: "Chất lượng công việc",
        name: "performanceReview.generalAssessmentOfResult.qualityOfWork",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
      {
        number: "2.2",
        title: "Tiến độ thực hiện công việc được giao",
        name: "performanceReview.generalAssessmentOfResult.progressOfAssignedWork",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
      {
        number: "2.3",
        title: "Kiến thức, năng lực chuyên môn",
        name: "performanceReview.generalAssessmentOfResult.knowledgeAndProfessionalCapacity",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
      {
        number: "2.4",
        title: "Tính chủ động, sáng kiến trong công việc",
        name: "performanceReview.generalAssessmentOfResult.proactivityAndInitiativeAtWork",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
    ],
  },

  // Tiêu chí 3
  {
    number: "3",
    title: "Kĩ năng trong công việc",
    criterions: [
      {
        number: "3.1",
        title: "Kĩ năng làm việc nhóm",
        name: "performanceReview.skillsAtWork.teamWorkingSkills",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
      {
        number: "3.2",
        title: "Kỹ năng giao tiếp và truyền đạt thông tin",
        name: "performanceReview.skillsAtWork.communicationSkills",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
      {
        number: "3.3",
        title: "Kỹ năng giải quyết vấn đề",
        name: "performanceReview.skillsAtWork.problemSolvingSkills",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
      {
        number: "3.4",
        title: "Kỹ năng quản lý thời gian/Quản lý task",
        name: "performanceReview.skillsAtWork.timeManagementSkills",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
    ],
  },

  // Tiêu chí 4
  {
    number: "4",
    title: "Thái độ và ý thức",
    criterions: [
      {
        number: "4.1",
        title: "Tính kỷ luật, tuân thủ",
        name: "performanceReview.attitudeAndConsciousness.discipline",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
      {
        number: "4.2",
        title:
          "Sẵn sàng tham gia các công việc, dự án, các hoạt động chung của Công ty (ngoài công việc chuyên môn)",
        name: "performanceReview.attitudeAndConsciousness.generalActivities",
        type: FORM_FIELDS.SELECT,
        scoreScale: [
          {
            score: 1,
            description:
              "1 - Công việc hoàn thành không đạt yêu cầu, cần phải làm lại",
          },
          {
            score: 2,
            description:
              "2 - Công việc hoàn thành đạt yêu cầu nhưng cần cải thiện",
          },
          {
            score: 3,
            description: "3 - Công việc hoàn thành đạt yêu cầu",
          },
          {
            score: 4,
            description: "4 - Công việc hoàn thành đạt yêu cầu và vượt yêu cầu",
          },
          {
            score: 5,
            description: "5 - Công việc hoàn thành vượt yêu cầu",
          },
        ],
      },
    ],
  },

  // Tiêu chí 5
  {
    number: "5",
    title: "Bổ sung khác",
    description: "chỉ QLTT đánh giá , điểm max 1,5",
    criterions: [
      {
        number: "5.1",
        title:
          "Khen thưởng nội bộ hoặc giải thưởng từ đơn vị chuyên môn/khách hàng.",
        name: "additionReview.bonus",
        type: FORM_FIELDS.SCORE_INPUT,
      },
      {
        number: "5.2",
        title:
          "Nỗ lực đáng kể cho những nhiệm vụ rất khó khăn so với level hiện tại, mặc dù thành tích chưa rõ ràng.",
        name: "additionReview.effort",
        type: FORM_FIELDS.SCORE_INPUT,
      },
    ],
  },

  {
    number: "6",
    title: "Ý kiến, đề xuất của nhân viên",
    criterions: [
      {
        number: "6.1",
        title: "Thuận lợi/Điểm mạnh",
        name: "opinionAndSuggestion.strongPoints",
        type: FORM_FIELDS.TEXTAREA,
      },
      {
        number: "6.2",
        title: "Khó khăn/Điểm yếu",
        name: "opinionAndSuggestion.weakness",
        type: FORM_FIELDS.TEXTAREA,
      },
      {
        number: "6.3",
        title: "Kế hoạch cho sự phát triển nghề nghiệp của bản thân",
        name: "opinionAndSuggestion.plan",
        type: FORM_FIELDS.TABLE,
      },
      {
        number: "6.4",
        title: "Đề xuất khác (nếu có)",
        name: "opinionAndSuggestion.otherSuggestions",
        type: FORM_FIELDS.TEXTAREA,
      },
    ],
  },
];

export default formReviewGeneral;
