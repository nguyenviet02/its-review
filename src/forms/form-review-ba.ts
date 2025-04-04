import { FORM_FIELDS, TFormReview } from '@/types';

const formReviewBA: TFormReview = [
  // Tiêu chí 1
  {
    number: '1',
    title: 'Đánh giá chung về kết quả công việc',
    criterions: [
      {
        number: '1.1',
        title: 'Bằng cấp chuyên môn',
        name: 'performanceReview.professionalQualifications',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0.2,
            description: 'ECBA',
          },
          {
            score: 0.4,
            description: 'ECBA',
          },
          {
            score: 0.6,
            description: `CCBA`,
          },
          {
            score: 0.8,
            description: 'CCBA',
          },
          {
            score: 1,
            description: 'CBAP',
          },
        ],
      },
      {
        number: '1.2',
        title: 'Kinh nghiệm',
        name: 'performanceReview.experience',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0.3,
            description: `Có các kiến thức cơ bản về:
- Công việc của BA: khái niệm, trách nhiệm, các task thường ngày
- Về phát triển phần mềm: Các bước cơ bản của SDLC, các title trong dự án`,
          },
          {
            score: 0.6,
            description: '~3 tháng',
          },
          {
            score: 0.9,
            description: '~1.5 năm',
          },
          {
            score: 1.2,
            description: '~3 năm',
          },
          {
            score: 1.5,
            description: '>5 năm',
          },
        ],
      },
      {
        number: '1.3',
        title: 'Công nghệ, domain',
        name: 'performanceReview.technologyAndDomain',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0.3,
            description: 'N/A',
          },
          {
            score: 0.6,
            description: 'N/A',
          },
          {
            score: 0.9,
            description:
              'Hiểu cấu trúc hệ thống. Có kiến thức về ít nhất 1 domain',
          },
          {
            score: 1.2,
            description:
              'Có kiến thức về công nghệ được sử dụng trong cấu trúc hệ thống (Các loại API, architechture,...) Có kiến thức về ít nhất 1 domain',
          },
          {
            score: 1.5,
            description:
              'Có kiến thức sâu về công nghệ được sử dụng, biết về các loại công nghệ mới. Có kiến thức về nhiều domain, kiến thức chuyên sâu về ít nhất 1 domain (~2 năm kinh nghiệm)',
          },
        ],
      },
      {
        number: '1.4',
        title: 'Tài liệu, biểu đồ',
        name: 'performanceReview.documentsAndCharts',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0.5,
            description: `Có kiến thức về một số diagram cơ bản thường được dùng:
- Activity diagram/Flowchart
- Use case diagram

Có kiến thức về cấu trúc tài liệu cơ bản:
- SRS
- BRD
- User story

Có kiến thức về ý nghĩa của tài liệu`,
          },
          {
            score: 1,
            description:
              'Đã từng viết và vẽ ít nhất một loại tài liệu kết hợp với 1 diagram tổng quan',
          },
          {
            score: 1.5,
            description: `Có khả năng sử dụng diagram cơ bản trong các trường hợp cần thiết bao gồm:
- Activity diagram/Flowchart
- Workflow
- ERD
- State transition diagram
- Use case diagram
- Sequence diagram

Có khả năng viết các tài liệu theo dự án:
- SRS
- BRD
- User story

=> Không quá 3 lỗi critical khi được review`,
          },
          {
            score: 2,
            description: `Có khả năng sử dụng diagram trong các trường hợp cần thiết bao gồm:
- Activity diagram/Flowchart
- Workflow
- ERD
- State transition diagram
- Use case diagram
- Sequence diagram
- Context diagram
- BPMN (tuỳ vào trường hợp sử dụng)

Có khả năng viết các tài liệu theo dự án:
- SRS
- BRD
- User story

=> Có thể độc lập viết và sử dụng tài liệu + diagram, đáp ứng được nhu cầu của dự án mà không cần phải được review`,
          },
          {
            score: 2.5,
            description: `Có khả năng sử dụng diagram trong các trường hợp cần thiết bao gồm:
- Activity diagram/Flowchart
- Workflow
- ERD
- State transition diagram
- Use case diagram
- Sequence diagram
- Context diagram
- BPMN (tuỳ vào trường hợp sử dụng)

Có khả năng viết các tài liệu theo dự án:
- SRS
- BRD
- User story

=> Có thể đưa ra quyết định về loại tài liệu + diagram được sử dụng trong dự án để phù hợp với tính chất, tiến độ và yêu cầu của dự án`,
          },
        ],
      },
      {
        number: '1.5',
        title: 'Tiếp cận, làm việc trong dự án và khai thác thông tin',
        name: 'performanceReview.approachAndWorkInProjectsAndExploitInformation',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 1,
            description: 'N/A',
          },
          {
            score: 2,
            description: `1. Tiếp cận dự án
Biết quy trình tiếp cận dự án gồm các bước nào

2. Xử lý dự án
Thể hiện được khả năng xử lý tình huống trong các trường hợp làm việc với stakeholder`,
          },
          {
            score: 3,
            description: `1. Tiếp cận dự án
Biết quy trình tiếp cận dự án gồm các bước nào.
Có kinh nghiệm tiếp cận ít nhất 1 dự án cùng level cao hơn với các đầu việc first meeting, elicitation, function decomposition.

2. Xử lý dự án
Thể hiện được các kinh nghiệm đã xử lý khi gặp vấn đề với stakeholder trong dự án`,
          },
          {
            score: 4,
            description: `1. Tiếp cận dự án
Có thể chủ động và độc lập tiếp cận dự án với các đầu việc first meeting, elicitation, function decomposition với output có thể sử dụng để làm quotation.

2. Xử lý dự án
Thể hiện được các kinh nghiệm đã xử lý khi gặp vấn đề với stakeholder trong dự án
Có thể làm việc độc lập  mà không cần đến micromanagement của cấp trên trong dự án`,
          },
          {
            score: 5,
            description: `1. Tiếp cận dự án
Có thể chủ động và độc lập tiếp cận dự án với các đầu việc first meeting, elicitation, function decomposition.

2. Xử lý dự án
Làm việc với nhiều stakeholder trong một dự án
Manage stakeholder Colaboration
Business Analysis Planning`,
          },
        ],
      },
      {
        number: '1.6',
        title: 'Giao tiếp, xử lý tình huống',
        name: 'performanceReview.communicationAndSituationHandling',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 0.6,
            description:
              'Giao tiếp cơ bản. Có thể gặp khó khăn khi diễn đạt ý tưởng một cách rõ ràng, mạch lạc. Chủ yếu xử lý các tình huống đơn giản, theo quy trình có sẵn',
          },
          {
            score: 1.2,
            description:
              'Có thể trao đổi thông tin cơ bản. Tuy nhiên, vẫn còn hạn chế trong việc lắng nghe, hiểu rõ quan điểm của người khác và truyền đạt thông tin phức tạp. Có thể xử lý một số tình huống không nằm trong quy trình, nhưng cần sự hỗ trợ từ đồng nghiệp hoặc cấp trên.',
          },
          {
            score: 1.8,
            description:
              'Giao tiếp hiệu quả, linh hoạt trong nhiều tình huống. Có khả năng lắng nghe tích cực, đặt câu hỏi để làm rõ thông tin, và truyền đạt ý tưởng một cách thuyết phục. Xử lý tốt các tình huống phức tạp. ',
          },
          {
            score: 2.4,
            description:
              'Có khả năng xây dựng mối quan hệ tốt với đồng nghiệp, khách hàng. Sử dụng ngôn ngữ chuyên môn hiệu quả. Xử lý tốt các vấn đề phức tạp. Có khả năng tìm ra các giải pháp sáng tạo.',
          },
          {
            score: 3,
            description:
              'Có khả năng thuyết phục và dẫn dắt người khác. Có thể tư vấn và đưa ra những quyết định đột phá, mang lại lợi ích lớn cho tổ chức. Có khả năng dự đoán và phòng ngừa các rủi ro.',
          },
        ],
      },
      {
        number: '1.7',
        title: 'Phân tích nghiệp vụ, phân tích hệ thống',
        name: 'performanceReview.businessAnalysisAndSystemAnalysis',
        type: FORM_FIELDS.SELECT,
        isRequired: true,
        scoreScale: [
          {
            score: 2.1,
            description: 'Có tư duy về phân tích nghiệp vụ, phân tích hệ thống',
          },
          {
            score: 4.2,
            description: 'Có tư duy về phân tích nghiệp vụ, phân tích hệ thống',
          },
          {
            score: 6.3,
            description:
              'Thể hiện được các phân tích nghiệp vụ, hệ thống trong kinh nghiệm làm việc',
          },
          {
            score: 8.4,
            description:
              'Có khả năng phân tích nghiệp vụ, hệ thống sâu và chi tiết, không thiếu case và flow. Recommend được system solution cho các vấn đề của stakeholder',
          },
          {
            score: 10.5,
            description:
              'Phân tích nghiệp vụ và hệ thống đủ sâu, ở cả mức high level (ví dụ: business model) và low level (hỗ trợ solution architechture). Recommend được solution (bao gồm cả high level solution) cho các vấn đề của stakeholder',
          },
        ],
      },
    ],
  },

  {
    number: '2',
    title: 'Ý kiến, đề xuất của nhân viên',
    notForManager: true,
    criterions: [
      {
        number: '2.1',
        title: 'Thuận lợi/Điểm mạnh',
        name: 'opinionAndSuggestions.strongPoints',
        type: FORM_FIELDS.TEXTAREA,
        isRequired: true,
      },
      {
        number: '2.2',
        title: 'Khó khăn/Điểm yếu',
        name: 'opinionAndSuggestions.weakness',
        type: FORM_FIELDS.TEXTAREA,
        isRequired: true,
      },
      {
        number: '2.3',
        title: 'Kế hoạch cho sự phát triển nghề nghiệp của bản thân',
        name: 'opinionAndSuggestions.plans',
        type: FORM_FIELDS.TABLE,
        isRequired: true,
      },
      {
        number: '2.4',
        title: 'Đề xuất khác (nếu có)',
        name: 'opinionAndSuggestions.otherSuggestions',
        type: FORM_FIELDS.TEXTAREA,
      },
    ],
  },

  // Tiêu chí 3
  {
    number: '3',
    title: 'Bổ sung khác',
    description: 'chỉ QLTT đánh giá , tổng điểm tối đa 1,5',
    isForManager: true,
    criterions: [
      {
        number: '3.1',
        title:
          'Khen thưởng nội bộ hoặc giải thưởng từ đơn vị chuyên môn/khách hàng.',
        name: 'bonus.internalCommendationOrAwardFromCustomer',
        type: FORM_FIELDS.SCORE_INPUT,
        isRequired: true,
      },
      {
        number: '3.2',
        title:
          'Nỗ lực đáng kể cho những nhiệm vụ rất khó khăn so với level hiện tại, mặc dù thành tích chưa rõ ràng.',
        name: 'bonus.considerableEffort',
        type: FORM_FIELDS.SCORE_INPUT,
        isRequired: true,
      },
    ],
  },

  // Tiêu chí 4
  {
    number: '4',
    title: 'Nhận xét, đánh giá của quản lý',
    isForManager: true,
    criterions: [
      {
        number: '4.1',
        title: 'Nhận xét, đánh giá thêm',
        name: 'comment',
        type: FORM_FIELDS.TEXTAREA,
        isRequired: true,
      },
    ],
  },
];

export default formReviewBA;
