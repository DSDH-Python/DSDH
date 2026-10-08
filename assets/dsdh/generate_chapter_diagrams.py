from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUTPUT = Path(__file__).parent
FONT_PATH = Path(r"C:\Windows\Fonts\msyh.ttc")
PALETTES = {
    3: ("#176B66", "#E5F2EF", "#D8754F"),
    5: ("#9B542F", "#F8EDE5", "#31748A"),
    6: ("#315D82", "#E9F0F6", "#C05746"),
    7: ("#39765A", "#EAF2E8", "#B87935"),
    8: ("#8B4C42", "#F6EAE7", "#477C82"),
    9: ("#506B46", "#EDF2E7", "#A95748"),
    10: ("#385F92", "#EAF0F8", "#C06B3E"),
    12: ("#176B66", "#E5F2EF", "#A85A3B"),
    13: ("#755B37", "#F4EFE4", "#34776F"),
}
CONTENT = {
    3: ("数据处理流水线", "从原始材料到可复现的数据成果", ["原始数据", "清洗校验", "pandas 处理", "可复现成果"], ["CSV / Excel", "缺失 · 重复 · 类型", "筛选 · 分组 · 聚合", "代码 · 环境 · 记录"], "每一步都留下可检查的记录"),
    5: ("视觉修辞：从数据到叙事", "图表呈现数据，也组织读者的注意力", ["数据事实", "视觉编码", "阅读路径", "解释边界"], ["来源与统计口径", "位置 · 色彩 · 形状", "标题 · 标注 · 顺序", "克制 · 可追溯"], "先核实数据，再设计叙事"),
    6: ("社会网络：关系成为结构", "人物、机构与文本通过关系连接", ["节点", "关系边", "网络结构", "解释与伦理"], ["人物 / 机构", "师承 · 交游 · 引用", "中心性 · 社群", "缺失关系也会造成偏差"], "网络呈现的是被记录的关系"),
    7: ("历史 GIS：时空叠加", "把地点、路线与历史时间放回地图", ["地名校勘", "坐标化", "时间切片", "空间解释"], ["史料与异名", "点 · 线 · 面", "政区沿革 / 事件", "尺度与边界须说明"], "坐标精度不能替代史料判断"),
    8: ("图像处理与计算机视觉", "让文化遗产图像可检索、可比较", ["原始影像", "预处理", "识别检索", "人工复核"], ["扫描 / 拓片", "校正 · 去噪 · 切分", "OCR · 分类 · 相似度", "保留原件与修改记录"], "修复结果必须与原始影像区分"),
    9: ("知识图谱：从文本到知识", "实体、关系与来源共同组成语义网络", ["原始文献", "实体关系", "本体约束", "检索问答"], ["段落 / 史料", "人 · 地 · 时 · 事", "类型 · 属性 · 规则", "图谱检索 + 来源证据"], "每条关系都应能回到来源"),
    10: ("机器学习：训练、评估与解释", "模型表现须在新数据与研究语境中检验", ["研究问题", "训练验证", "评估误差", "解释复核"], ["特征 / 标签", "划分数据集", "指标 + 基线", "偏差 / 范围 / 局限"], "高分不等于可靠的人文结论"),
    12: ("AI 前沿：多模态与智能工作流", "模型能力需要数据、工具与治理共同支撑", ["多模态输入", "模型推理", "工具协作", "治理复核"], ["文本 · 图像 · 音频", "生成 / 推理 / 检索", "智能体 · MCP · API", "隐私 · 版权 · 人工核验"], "能力越强，越需要明确责任边界"),
    13: ("综合项目：形成可辩护的结论", "组合方法回答一个真实的人文问题", ["真实问题", "合规数据", "适配方法", "证据答辩"], ["范围明确", "来源与许可", "至少两种方法", "局限 · 复现 · 反思"], "结论要有证据，也要说明边界"),
}


def font(size):
    return ImageFont.truetype(str(FONT_PATH), size)


def centered(draw, x, y, text, face, color):
    box = draw.textbbox((0, 0), text, font=face)
    draw.text((x - (box[2] - box[0]) / 2, y - (box[3] - box[1]) / 2), text, font=face, fill=color)


def frame(chapter, title, subtitle, accent):
    image = Image.new("RGB", (1600, 900), "#F8F7F2")
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((52, 48, 1548, 852), 22, fill="#FFFFFF", outline="#D9E0E5", width=2)
    draw.rounded_rectangle((52, 48, 72, 852), 9, fill=accent)
    draw.text((112, 92), f"第 {chapter:02d} 章  ·  数字人文", font=font(21), fill=accent)
    draw.text((112, 142), title, font=font(42), fill="#243246")
    draw.text((114, 218), subtitle, font=font(24), fill="#647184")
    return image, draw


def generic(chapter, config):
    title, subtitle, labels, details, takeaway = config
    accent, soft, second = PALETTES[chapter]
    image, draw = frame(chapter, title, subtitle, accent)
    x0, gap, card_width = 115, 28, 320
    for index, (label, detail) in enumerate(zip(labels, details)):
        x, y = x0 + index * (card_width + gap), 380
        fill = soft if index % 2 == 0 else "#F5F6F3"
        outline = accent if index in (0, 3) else "#D9E0E5"
        draw.rounded_rectangle((x, y, x + card_width, y + 235), 18, fill=fill, outline=outline, width=3)
        draw.ellipse((x + 24, y + 24, x + 72, y + 72), fill=accent if index % 2 == 0 else second)
        centered(draw, x + 48, y + 48, str(index + 1), font(22), "#FFFFFF")
        draw.text((x + 24, y + 94), label, font=font(25), fill="#243246")
        draw.line((x + 24, y + 143, x + card_width - 24, y + 143), fill="#D9E0E5", width=2)
        draw.text((x + 24, y + 164), detail, font=font(18), fill="#647184")
        if index < 3:
            draw.polygon([(x + card_width + 3, y + 100), (x + card_width + 19, y + 112), (x + card_width + 3, y + 124)], fill=second)
    draw.rounded_rectangle((115, 690, 1485, 770), 14, fill="#F5F4EF", outline="#E4E1D8", width=2)
    centered(draw, 800, 730, takeaway, font(22), accent)
    return image


def network_diagram(chapter, config):
    title, subtitle, _, _, takeaway = config
    accent, soft, second = PALETTES[chapter]
    image, draw = frame(chapter, title, subtitle, accent)
    points = [(330, 445), (570, 350), (805, 480), (1050, 355), (1290, 480), (790, 650)]
    names = ["人物", "师承", "交游", "群体", "文本", "社群"]
    edges = [(0, 1), (1, 2), (2, 3), (3, 4), (1, 5), (5, 2), (5, 4), (0, 5), (2, 4)]
    for start, end in edges:
        draw.line((*points[start], *points[end]), fill="#AAB8C2", width=5)
    for index, (x, y) in enumerate(points):
        radius = 50 if index in (1, 2, 5) else 42
        fill = accent if index in (1, 2, 5) else "#F7E7D9"
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=fill, outline=second, width=4)
        centered(draw, x, y, names[index], font(22), "#FFFFFF" if index in (1, 2, 5) else "#243246")
    draw.text((112, 740), takeaway, font=font(22), fill="#647184")
    return image


def map_diagram(chapter, config):
    title, subtitle, _, _, takeaway = config
    accent, soft, second = PALETTES[chapter]
    image, draw = frame(chapter, title, subtitle, accent)
    draw.rounded_rectangle((140, 330, 880, 690), 18, fill="#EEF3EC", outline="#CBD9CC", width=2)
    for x in range(220, 850, 110):
        draw.line((x, 350, x - 20, 670), fill="#D5DED4", width=2)
    for y in range(400, 680, 72):
        draw.line((170, y, 850, y + 18), fill="#D5DED4", width=2)
    points = [(280, 510), (390, 430), (510, 560), (680, 455), (790, 590)]
    for start, end in zip(points, points[1:]):
        draw.line((*start, *end), fill=second, width=8)
    for x, y in points:
        draw.ellipse((x - 13, y - 13, x + 13, y + 13), fill=accent, outline="#FFFFFF", width=3)
    draw.text((970, 345), "時間切片", font=font(25), fill=accent)
    for index, label in enumerate(["早期", "中期", "晚期"]):
        y = 414 + index * 86
        draw.line((980, y, 1420, y), fill="#D9E0E5", width=5)
        draw.ellipse((1010 + index * 125, y - 11, 1032 + index * 125, y + 11), fill=second)
        draw.text((1375, y - 19), label, font=font(20), fill="#647184")
    draw.text((140, 735), takeaway, font=font(22), fill="#647184")
    return image


def vision_diagram(chapter, config):
    title, subtitle, labels, _, takeaway = config
    accent, soft, second = PALETTES[chapter]
    image, draw = frame(chapter, title, subtitle, accent)
    for index, x in enumerate([130, 500, 870, 1240]):
        y = 360
        draw.rounded_rectangle((x, y, x + 230, y + 240), 16, fill=soft if index % 2 == 0 else "#F3F5F4", outline=accent if index == 0 else "#D9E0E5", width=3)
        if index == 0:
            for line_y in range(y + 58, y + 185, 23):
                draw.line((x + 38, line_y, x + 185, line_y + 8), fill="#525C62", width=5)
            draw.rectangle((x + 38, y + 48, x + 190, y + 190), outline=second, width=2)
        elif index == 1:
            for line_y, width, color in [(y + 85, 140, second), (y + 120, 112, accent), (y + 155, 132, "#677B84")]:
                draw.line((x + 45, line_y, x + 45 + width, line_y), fill=color, width=8)
        elif index == 2:
            draw.rounded_rectangle((x + 40, y + 60, x + 190, y + 177), 8, fill="#FFFFFF", outline=second, width=3)
            centered(draw, x + 115, y + 118, "OCR", font(34), accent)
        else:
            draw.ellipse((x + 73, y + 70, x + 157, y + 154), outline=accent, width=5)
            draw.line((x + 138, y + 144, x + 190, y + 194), fill=accent, width=8)
        centered(draw, x + 115, y + 215, labels[index], font(20), "#243246")
    for x in [382, 752, 1122]:
        draw.polygon([(x, 452), (x + 30, 470), (x, 488)], fill=second)
    draw.text((130, 710), takeaway, font=font(22), fill="#647184")
    return image


def graph_diagram(chapter, config):
    title, subtitle, _, _, takeaway = config
    accent, soft, second = PALETTES[chapter]
    image, draw = frame(chapter, title, subtitle, accent)
    nodes = {"文献": (260, 470), "人物": (550, 360), "地点": (850, 510), "事件": (1120, 370), "时间": (1330, 570)}
    edges = [("文献", "人物"), ("文献", "地点"), ("人物", "事件"), ("地点", "事件"), ("事件", "时间"), ("人物", "地点")]
    for start, end in edges:
        draw.line((*nodes[start], *nodes[end]), fill="#B5C2B7", width=5)
    for label, (x, y) in nodes.items():
        draw.ellipse((x - 75, y - 46, x + 75, y + 46), fill=soft, outline=accent, width=4)
        centered(draw, x, y, label, font(22), "#243246")
    centered(draw, 720, 650, "关系 + 来源证据", font(23), second)
    draw.text((135, 740), takeaway, font=font(22), fill="#647184")
    return image


for chapter, config in CONTENT.items():
    if not FONT_PATH.exists():
        raise FileNotFoundError(f"Chinese font not found: {FONT_PATH}")
    if chapter == 6:
        image = network_diagram(chapter, config)
    elif chapter == 7:
        image = map_diagram(chapter, config)
    elif chapter == 8:
        image = vision_diagram(chapter, config)
    elif chapter == 9:
        image = graph_diagram(chapter, config)
    else:
        image = generic(chapter, config)
    image.save(OUTPUT / f"ch{chapter:02d}_diagram.png", optimize=True)
    print(f"generated ch{chapter:02d}_diagram.png")
