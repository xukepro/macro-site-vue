<template>
  <transition name="fade">
    <div v-if="visible" class="modal-wrap">
      <div class="modal">
        <div class="header">
          {{ title }}
          <div class="close">
            <i class="el-icon-close" :style="'width:'+ width +'%;'" @click="close" />
          </div>
        </div>
        <div class="bd">
          <slot name="content" />
        </div>
        <slot name="ft">
        <!--<div class="ft" slot="ft">
          <a href="javscript:void(0)" class="btn make-sure" @click="sure">确定</a>
          <a href="javscript:void(0)" class="btn cancel" @click="close">取消</a>
        </div>-->
        </slot>
      </div>
      <div class="backdrop" @click="close" />
    </div>
  </transition>
</template>

<!-- <div slot="ft" class="ft">
  <a class="btn btn-primary" @click="sure">确定</a>
  <a class="btn btn-default" @click="isVisible=false">取消</a>
</div> -->

<script>
export default {
  name: 'MyModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
    }
  },
  watch: {
    visible: function(curVal) {
      if (curVal && document.body.scrollHeight > window.innerHeight) {
        // this.$('body').addClass('backdrop-open')
        document.getElementsByTagName('body')[0].className = 'backdrop-open'
      } else {
        // this.$('body').removeClass('backdrop-open')
        document.body.removeAttribute('class', 'equipment-body')
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50%, -50%);

  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  // color: white;
  z-index: 100;
}

.header {
  height: 30px;
  padding: 10px
}

.close {
  float: right;
}

i {
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }
}

</style>

