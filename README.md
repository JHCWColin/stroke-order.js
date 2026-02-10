# StrokeOrder.js 详细使用手册

本手册将带你深入了解如何通过 HTML 属性精确控制每一个笔画动画的细节。

## 1. 快速集成

在 HTML 页面末尾引入库文件即可：

```html
<script src="path/to/stroke-order.js"></script>

```

## 2. 基础标签

将 `class="stroke-order-in"` 添加到任何包含英文字母的标签上。

```html
<h1 class="stroke-order-in">HELLO</h1>

```

## 3. 参数速查表

在深入了解细节前，你可以通过下表快速查找可用参数及其默认行为：

| 属性 | 核心功能 | 默认值 | 推荐值/范围 |
| --- | --- | --- | --- |
| `data-font-size` | 字体大小 (px) | `200` | 建议根据布局调整 |
| `data-speed` | 书写速度 | `slow` | `normal`, `fast`, `fastest` |
| `data-color` | 笔画颜色 | 继承 CSS | RGBA 格式 (如 `255,0,0,1`) |
| `data-stroke-k` | 笔画粗细系数 | `0.05` | `0.02` (极细) ~ `0.1` (极粗) |
| `data-rounded` | 圆角开关 | `false` | `true` (圆润) / `false` (平齐) |
| `data-delay` | 启动延迟 (ms) | `0` | 如 `500` |
| `data-async` | 异步绘制模式 | `false` | `true` (所有笔画同时生长) |
| `data-async-interval` | 异步起始间距 (ms) | `50` | 建议 `20` ~ `100` |
| `data-ease-in` | 由慢变快缓动 | `false` | `true` / `false` |
| `data-ease-out` | 由快变慢缓动 | `false` | `true` (推荐开启) |

## 4. 详细参数说明 (Data Attributes)

你可以通过给标签添加不同的 `data-` 属性来深度定制动画效果。

### 4.1 基础外观与速度
### **`data-font-size`**
* **作用**：定义生成动画的字号大小（单位：像素）。
* **详细说明**：Canvas 会根据此数值计算比例，数值越大，文字越清晰，占位面积越大。
* **示例**：`data-font-size="300"`


### **`data-speed`**
* **作用**：设置整体书写速度。
* **详细说明**：可选值为 `slowest`, `slower`, `slow`, `normal`, `fast`, `faster`, `fastest`。
* **示例**：`data-speed="fastest"`


### **`data-color`**
* **作用**：定义笔画颜色。
* **详细说明**：支持 `RGBA` 格式（例如 `255,0,0,1`）。如果不设置，程序会自动读取该标签在 CSS 中定义的文字颜色。



### 4.2 笔画物理特性

### **`data-stroke-k`**
* **作用**：控制笔画的粗细。
* **详细说明**：这是一个系数，默认值为 `0.05`。数值越大笔画越粗。
* **示例**：`data-stroke-k="0.08"` (加粗效果)


### **`data-rounded`**
* **作用**：开启或关闭圆角端点。
* **详细说明**：
* `true`: 笔画末端是圆润的。
* `false` (默认): 笔画末端是平齐的，且会自动开启“基准线剪裁”，确保笔画高度在特定范围内严格统一。





### 4.3 动画节奏与逻辑

### **`data-delay`**
* **作用**：设置动画启动前的等待时间（单位：毫秒）。
* **示例**：`data-delay="500"`


### **`data-async`**
* **作用**：开启异步绘制模式。
* **详细说明**：
* `false` (默认): 字母内的笔画会一笔一画顺序书写。
* `true`: 字母内的所有笔画会同时开始生长，适合制作充满动感的 UI 效果。




### **`data-async-interval`**
* **作用**：异步绘制时的起始间距（仅在 `data-async="true"` 时生效）。
* **示例**：`data-async-interval="70"`



### 4.4 缓动控制 (Easing)

### **`data-ease-in`**：笔画开始时由慢变快。
### **`data-ease-out`**：笔画结束时由快变慢（更符合人类真实书写习惯）。

---

## 5. 综合配置示例

### 5.1 优雅慢速书写

适合标题展示，带有平滑的缓动感：

```html
<h1 class="stroke-order-in" 
    data-font-size="120" 
    data-speed="slow" 
    data-ease-out="true" 
    data-rounded="true">
    GENTLE ART
</h1>

```

### 5.2 动感全开示例 (推荐)

通过开启 `async`（异步绘制）和 `faster`（极速），并配合微小的 `async-interval`（时间差），可以创造出极具现代感的视觉冲击力：

```html
<h1 class="stroke-order-in" 
    data-font-size="200" 
    data-stroke-k="0.09" 
    data-rounded="false" 
    data-speed="faster"
    data-ease-out="true" 
    data-ease-in="false" 
    data-async="true" 
    data-delay="200" 
    data-async-interval="70" 
    data-color="255, 255, 255, 1">
    DYNAMIC UI
</h1>

```

## 6. 开发者建议

* **动态加载**：如果你通过 JavaScript 动态向页面添加了新元素，别忘了调用 `window.TextOrder.refresh();` 来刷新监听。
* **背景适配**：当设置 `data-color` 为白色或浅色时，请确保父容器有深色背景以获得最佳视觉效果。
