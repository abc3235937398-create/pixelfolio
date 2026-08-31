const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', 'pixelfolio', 'src', 'data', 'portfolioData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const newProjects = `  projects: [
    {
      id: 'proj-1',
      title: '阳光电源核心大客户全流程交付',
      tag: '大客户项目 / 供应链导入',
      category: 'project',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=commercial%20energy%20storage%20battery%20containers%20installation%20in%20solar%20farm,%20industrial%20style,%20photorealistic&image_size=landscape_16_9',
      accentColor: '#fef3c7',
      badgeColor: '#f59e0b',
      client: '阳光电源 (Sungrow Power)',
      year: '2024 - 至今',
      description: '独立负责阳光电源核心大客户全维度业务对接，全面统筹新业务开拓、新品研发落地、客户审厂、订单交付优化等全链条工作。',
      background: '高效整合内外务资源，保障项目稳定落地，持续推动合作业务增量扩容。',
      metrics: [
        { label: '项目合作体量', value: '6000W-8000W' },
        { label: '新增业务体量', value: '900W+' },
        { label: '订单交付', value: '2000W+' },
      ],
      responsibilities: [
        '新业务开拓增量：对接海外阳光大储产品导入落地，国内声光报警器、复合气体探测器等新品类合作机会。',
        '跨部门研发协同：主导消防类新产品导入、迭代升级及同题整改工作，联动研发、测试等多部门团队把控落地节点。',
        '客户审厂全流程管控：全权负责年度及专项审厂对接，统筹筹备全套审核资料，零重大问题通过历次审厂。',
        '交付体系优化提效：全流程跟进订单生命周期，搭建标准化交付落地体系，优化发货及对接流程。',
        '售后闭环维稳客情：全面承接客户售后诉求，专项处理各类客诉问题，快速协调内部资源完成闭环。'
      ],
      results: [
        '助力大客户新增业务体量900W+，有效扩大整体合作体量。',
        '保障新品顺利量产、稳定供货，稳固核心客户合作资质与合作准入资格。',
        '大幅提升交付效率与产品交付质量，顺利完成2000W+订单交付工作。',
        '显著提升客户满意度，稳固与头部大客户的长期深度合作关系。'
      ],
      tools: ['ERP/SRM', '大客户销售', '跨部门协同', '交付管理', '客诉闭环'],
    },
    {
      id: 'proj-2',
      title: '华图教育数字教材项目',
      tag: '数字教材 / 渠道拓展',
      category: 'operation',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      accentColor: '#e0f2fe',
      badgeColor: '#0ea5e9',
      client: '华图教育科技集团',
      year: '2025 - 2026',
      description: '深度调研高校数字教材教学需求，定制适配高校教学场景的数字教材解决方案，推动产品入校落地与试点应用。',
      background: '整合出版社优质内容资源，推动数字教材内容数字化、标准化开发，实现内容资源与产品形态的精准匹配，搭建数字教材内容资源库。',
      metrics: [
        { label: '单月业绩', value: '150万' },
        { label: '大客户稳定业绩', value: '50万' },
      ],
      responsibilities: [
        '高校合作：对接高校教务处、院系负责人，定制适配高校教学场景的数字教材解决方案。',
        '出版社合作：整合出版社优质内容资源，推动数字教材内容数字化、标准化开发。',
        '代理商售前赋能：制定代理商售前培训体系，输出产品销售工具与方案模板，赋能代理商开展区域市场推广。',
        '售前与商务：为合作方提供专业的数字教材产品演示、功能讲解等售前支持，参与核心商务谈判。',
        '行业资源拓展：参与并推动协同代理商举办数字教材行业峰会、论坛等活动，进行产品品牌推广与行业资源对接。'
      ],
      results: [
        '明确合作条款与落地规则，推动合作协议签订，单月业绩达150万。',
        '把控项目全流程节点，协调各方资源解决合作落地问题，高效完成项目业绩目标。',
        '大客户（渠道）合作与管理，大客户稳定业绩50万。'
      ],
      tools: ['高校合作', '渠道赋能', '商务谈判', '行业峰会', '数字教材'],
    },
    {
      id: 'proj-3',
      title: '小红书种草学学习中心 (0-1平台搭建)',
      tag: '商业产品 / B端系统',
      category: 'product',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      accentColor: '#fee2e2',
      badgeColor: '#f43f5e',
      client: '小红书商业化团队',
      year: '2023 - 2024',
      description: '结合小红书商业化场景，从0-1设计并推动产品落地，主要负责课程中心、标签体系、课程推荐、学习分析的建设。',
      background: '小红书拥有多个对客平台品牌（聚光、专业号、星火、种草学），各业务平台均有学习成长诉求，产品侧规划搭建统一学习中心，实现一处生产，多处分发。',
      metrics: [
        { label: '节省采购成本', value: '300万/年' },
        { label: '周活跃用户(UV)', value: '10w+' },
        { label: '周人均学习时长', value: '120 min+' },
        { label: '沉淀有效线索', value: '5k+' },
      ],
      responsibilities: [
        '0-1设计并推动产品落地，打造了多类型课程、系列课、课程绑定等一系列功能。',
        '设计学习中心管理端课程分发系统，实现课程一处生产、多处复用的目的。',
        '设计并建立数据分析能力，通过客户留存、用户行为分析，共沉淀有效客户线索5k+。'
      ],
      results: [
        '赋能业务团队对用户、课程、目录、商品做闭环管理，完全替代了原来购买的第三方小鹅通能力，节省三百万成本/年。',
        '学习中心整体周uv10w+，日均uv1.5w+，周学习人数3w+，周人均学习时长120min+，各项数据表现超出预期。',
        '种草学项目获得小红书内部2024年Q3 Extra Mile入围奖。'
      ],
      tools: ['产品设计', '数据分析', 'B端平台', '用户调研', '竞品分析'],
    }
  ]`;

const regex = /  projects: \[\s*\{[\s\S]*?\}\s*\],\s*faqs:/m;
content = content.replace(regex, newProjects + ',\n  faqs:');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated projects array");