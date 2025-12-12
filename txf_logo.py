import matplotlib.pyplot as plt
import matplotlib.patches as patches

def create_txf_logo():
    # 1. 设置画布：黑色背景，比例适中
    fig, ax = plt.subplots(figsize=(10, 4), facecolor='black')
    ax.set_facecolor('black')
    
    # 设置坐标系范围 (0-170宽, 0-60高)
    ax.set_xlim(0, 170)
    ax.set_ylim(0, 60)
    
    # 翻转Y轴，让(0,0)在左上角，方便像网页布局一样思考
    ax.invert_yaxis()
    
    # 隐藏边框和坐标轴刻度
    ax.axis('off')

    # ==========================================
    # 2. 定义字母的顶点坐标 (几何绘制)
    # ==========================================
    
    # 字母 T
    # 逻辑：顶部宽横条 + 中间竖条
    path_t = [
        (10, 5),  (55, 5),   # 顶横条上边
        (55, 18), (39, 18),  # 顶横条右下
        (39, 55), (26, 55),  # 竖条底部
        (26, 18), (10, 18)   # 顶横条左下
    ]

    # 字母 X
    # 逻辑：两个斜切的长条交叉
    path_x = [
        (58, 5),  (74, 5),   # 左上起点
        (84, 22),            # 中间交叉点上部
        (94, 5),  (110, 5),  # 右上起点
        (92, 30),            # 右侧中间凹陷
        (110, 55), (94, 55), # 右下终点
        (84, 38),            # 中间交叉点下部
        (74, 55), (58, 55), # 左下终点
        (76, 30)             # 左侧中间凹陷
    ]

    # 字母 F
    # 逻辑：竖条 + 两个横向短臂
    path_f = [
        (115, 5), (155, 5),  # 顶部横条上边
        (155, 18), (131, 18),# 顶部横条右侧回折
        (131, 24),           # 竖条中间空隙
        (150, 24), (150, 37),# 中间横条
        (131, 37), (131, 55),# 竖条下半部分
        (115, 55)            # 底部左角
    ]

    # ==========================================
    # 3. 将形状添加到画布
    # ==========================================
    
    # 绘制 T (白色)
    t_patch = patches.Polygon(path_t, closed=True, facecolor='white', edgecolor='none')
    ax.add_patch(t_patch)

    # 绘制 X (白色)
    x_patch = patches.Polygon(path_x, closed=True, facecolor='white', edgecolor='none')
    ax.add_patch(x_patch)

    # 绘制 F (白色)
    f_patch = patches.Polygon(path_f, closed=True, facecolor='white', edgecolor='none')
    ax.add_patch(f_patch)

    # ==========================================
    # 4. 保存与预览
    # ==========================================
    
    # 保存为高清 PNG 文件
    plt.savefig('txf_logo.png', facecolor='black', bbox_inches='tight', dpi=300)
    print("图片已保存为 txf_logo.png")
    
    # 弹出窗口预览
    plt.show()

if __name__ == "__main__":
    create_txf_logo()