<template>
  <span>
    <DefaultSkeleton :value='value' :item="item"
                     v-if="value.preview === 'skeleton' &
                           value.loading"/>
    <div class="widget"
         :style="this.store.getStyles(this.value.styleProps)"
         v-if="!value.loading">
    <img
      src="https://media.istockphoto.com/photos/green-apple-picture-id584226186?k=20&m=584226186&s=170667a&w=0&h=YaNNvCnxJR8-VVQX62PjEOxa2FhzY8whNfkrsr2FgUs="
      alt="cola">
    </div>
  </span>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import useForm from '@/components/widgets/EditForms.vue';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import LayoutStorage from '@/helpers/LayoutStorage';
import DefaultSkeleton from '@/components/mixins/DefaultSkeleton.vue';


@Component({
  components: {
    useForm,
    DefaultSkeleton
  }
})
export default class Green extends Vue {

  protected store = new LayoutStorage()

  @Prop({}) protected value!: any
  @Prop({}) protected item!: any

}

</script>


<style scoped>

.widget {
  background: white;
  height: calc(100% - 26px);
  padding: 10px;
}

img {
  width: 100%;
  height: 50%;
  object-fit: contain;
}

</style>
