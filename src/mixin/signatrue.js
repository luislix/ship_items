export default {
    data() {
        return {
            option: {
                penColor: "rgb(0, 0, 0)",
                backgroundColor: "rgb(255,255,255)"
            },
            disabled: false,
            dataUrl: ""
        };
    },
    methods: {
        // 清空
        clear() {
            var _this = this;
            _this.$refs.signature.clear();
        },
        // 撤销
        undo() {
            var _this = this;
            _this.$refs.signature.undo();
        },
        // 添加水印
        addWaterMark() {
            var _this = this;
            _this.$refs.signature.addWaterMark({
                text: "mark text", // watermark text, > default ''
                font: "20px Arial", // mark font, > default '20px sans-serif'
                style: 'all', // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill		
                fillStyle: "red", // fillcolor, > default '#333' 
                strokeStyle: "blue", // strokecolor, > default '#333'	
                x: 100, // fill positionX, > default 20
                y: 200, // fill positionY, > default 20				
                sx: 100, // stroke positionX, > default 40
                sy: 200 // stroke positionY, > default 40
            });
        },
        fromDataURL(url) {
            var _this = this;
            _this.$refs.signature.fromDataURL("data:image/png;base64,iVBORw0K...");
        },
        handleDisabled() {
            var _this = this;
            _this.disabled = !_this.disabled
        }
    }
}