# Mad

- 这是一个自己的工具整理，里面涉及了前端开发中遇到的各种工具和问题
- 如果不想看源代码或者不想自己编译的可以去dist中自己下载对应的文件
- 编译命令可以参考下面的命令，gulp -o可以生成压缩版本代码
- 其他情自行摸索,项目主要提供源代码

# 文件夹说明

- src:源文件夹
- dist：生成文件的文件夹
- config.json:配置源文件的监听
- doc :一些遇到问题的记录文件
- prospectus :收集一些商业计划书

# 命令

- gulp：启动http服务，监听文件改动
- gulp build：重新生成对应的文件,追加-o参数可以打包压缩版本的js
- gulp clean：清除生成的文件
- gulp server：单独启动http服务
- gulp watch：监听文件改动
- gulp help：简单的帮助，希望能够起到作用
- npm install：下载node各种包

# 已添加的工具或者问题

- js/scroll.ts :监听滚动条滚动事件并在移动到最底部的时候触发回调
- js/flexible.js :移动端自适应插件。将屏幕格式化为统一的宽度。
- base.less ：初始化页面并添加简单的浮动、文本居中、flex等class
- border.less :
- button.less :按钮css类
- flex.less :
- form.less :
- grid.less :
- icon.less :icon的css类
- pagination.less :
- popup.less :
- progress.less :
- rounded.less :
- table.less :
- html/base.html :初始化页面的html框架。

# 更新日志

- 好久没更新了，2017-9-16
- 开放dist目录，方便直接下载
- 初始化项目并添加几个基础类库
