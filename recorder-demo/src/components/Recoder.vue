<template>
  <div>
      <button @click="start">开始录音</button>
      <button @click="end">结束录音</button>
      <h3>
            录音时长：<span id="time">{{ time }}</span>s
        </h3>
      <div id="container">
          
      </div>
  </div>
</template>

<script>
// import Recorder from "recorder-js"; 
import Recorder from 'js-audio-recorder';
export default {
    data(){
        return {
            recorder:null,
            time: 0
        }
    },
    methods: {
        
        start(){
            // if(!this.recorder){

                this.recorder = new Recorder({
                    sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
                    sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
                    numChannels: 1,         // 声道，支持 1 或 2， 默认是1
                });
                // this.recorder.onprocess = function(duration) {
                //     // 部分低版本浏览器不支持innerText，改用innerHTML
                //     this.time= duration.toFixed(5);
                //     // console.log(duration);
                // }
            // }
            Recorder.getPermission().then(() => {
                console.log('给权限了');
                this.recorder.start().then(function() {
                    // 开始录音
                    console.log('开始录音');
                });
            }, (error) => {
                console.log(`${error.name} : ${error.message}`);
            });

            
            
        },
        end(){
            let srcRecorder = this.recorder.getWAVBlob();
            console.log('srcRecorder',srcRecorder)
            this.recorder.stop();
            console.log('222222',this.recorder.duration.toFixed(5));
             this.time= this.recorder.duration.toFixed(5);

            var container = document.querySelector('#container')
            var audio = document.createElement('audio');
            audio.src = URL.createObjectURL(srcRecorder);
            audio.controls = true;
            container.appendChild(audio);

            // this.recorder.destroy().then(function() {
            //     this.recorder = null;
            // });
        }
    }
}
</script>

<style>

</style>