# AA 杯杯手账改版

## 最新调整

- 导航最终顺序：本周、杯杯月历、杯杯集章册、全部记录。页面标题为「AA 的杯杯集章册」，默认展示品牌印章。

- 导航「备份」替换为「贴纸 / 印章」收藏页；饮品贴纸点击编辑，品牌印章按首次记录日期生成、点击筛选对应品牌。原备份功能保留在页底折叠区，旧 /backup 地址兼容。
- 一周打卡杯子由固定 28×32px 改为自适应格子宽度及 62–118px 高度，展示时裁去透明留白，保留未记录的淡色杯。
- 收藏页新增两项印章派生数据测试，共 11 项测试通过；手机和桌面检查通过，导入的五条临时样本已清理。

- 首页已恢复原版女孩相框和原有小贴纸，移除本周漂浮收藏及重播入口。
- 漂浮汇聚移至开屏：以原有 SVG 插画风格绘制抹茶奶茶、冰拿铁、珍珠奶茶、草莓鲜奶，从四周浮入聚拢。保留 AA 探头及自动进入首页。
- 开屏副标题已删除；价格占位提示缩短为「输入金额」。
- 已检查 390px 手机开屏和恢复后的首页，构建通过。新截图：opening-drinks-mobile.jpg。

下方为初版实施记录，最新表现以上述调整为准。

改版基于 3a2c0ee，保留现有 TeaGirl、AaReaction、PhotoEditor、WeeklyBudget 及空记录动画。

## 完成

- 每次整页打开播放一次探头开屏，约 2 秒；无跳过按钮，路由切换不重播。素材异常最多等待 3.2 秒，减少动态效果偏好下缩短开场。
- 本周记录最多六杯错峰浮入、轻转、聚拢与持续轻微漂浮，可重播、点击编辑。无记录时沿用原版首页。
- 月历放大贴纸，展示时裁掉透明留白，不改原始照片；同日多杯角标；静态 AA 趴边。
- 12 个预设品牌、最近品牌、筛选、自定义品牌和历史饮品名。
- 甜度冰量点选；可选杯型、加料、自定义加料、价格、评分及备注。新字段随 v1 JSON 备份往返，旧记录兼容。

## 品牌素材

标识仅用于辨认品牌，不代表合作关系。已内置七个可取得的标识；茶百道、沪上阿姨、奈雪、茶颜悦色、CoCo 暂用名称徽标，避免使用错误的官方 Logo。所有图标本地加载，运行时不请求第三方。

- 喜茶：https://www.heytea.com/ （官网 logo.webp）
- 古茗：https://gumingnc.com/ （官网 favicon）
- 蜜雪冰城：https://www.mxbc.com/ （官网 favicon）
- 一点点：https://www.alittle-tea.com/ （官网 touch icon）
- 星巴克：https://www.starbucks.com.cn/ （官网 touch icon）
- 霸王茶姬：https://en.wikipedia.org/wiki/File:Chagee_logo.svg
- 瑞幸：https://en.wikipedia.org/wiki/File:Luckin_Coffee_Logo.svg

## 人物素材

使用内置 image_gen，参考 src/assets/tea-girl-puppet.png，新增 public/aa-peek-atlas.webp。原人物图及动画未替换。生成图已人工查看，压缩为带透明通道的 WebP。

最终提示词：

Create ONE production-ready transparent PNG sprite atlas for this existing tea diary character. Reference is identity and watercolor style reference; preserve exactly her chestnut bob and bangs, huge round brown eyes, tiny beauty mark beneath her right eye (viewer right), cream tiny flower sleeves, warm handpainted outlines. Atlas square, strict 2x2 equal cells with generous clear transparent gaps, no text, no grid, no background. TOP LEFT: girl's HEAD plus TWO LITTLE HANDS hooked over an INVISIBLE horizontal ledge, facing front open eyes sweet smile, chin and fingers at the SAME baseline near bottom of cell. No body below hands, no cup or actual ledge. TOP RIGHT: IDENTICAL precisely aligned pose and scale as top left but eyes closed in a happy blink. BOTTOM LEFT: standalone large open-top milk tea cup, NO dome lid NO straw NO hands, cream rim, orange milk tea, black tapioca pearls bottom, brown cute cat face logo copied from reference. Front view with elliptical open rim, cup fits cell. BOTTOM RIGHT: left EMPTY transparent. These isolated components will be composed in code: head rises behind cup and little hands rest on rim; open-eyed head also peers over calendar edge. Keep same watercolor texture and delicate soft brown outlines as reference. Occupy each cell generously without crossing cell boundaries. No extra objects, no white matte.

## 验证

- Node 数据测试：9 项通过，包括新字段保存/重读/备份往返、非法字段、旧数据、存储异常与日期边界。
- 实际浏览器：390px 手机布局及 1200px 桌面布局；开屏自动退出；六杯展示及重播；品牌点选；详细字段保存和重新编辑；选中 16 日后新增带入 16 日；v1 测试备份导入。
- review 内截图中的记录为临时测试样本，不是用户真实饮品记录。
