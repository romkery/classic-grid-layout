<template>
  <span>
   <DefaultSkeleton :value='value'
                    :item="item"
                    v-if="value.preview === 'skeleton' &
                          value.loading"/>
  <div class="widget"
       :style="this.store.getStyles(this.value.styleProps)"
       v-if="!value.loading">
    <img src="https://democrats.org/wp-content/uploads/2019/08/TeamBlue_gradient.png?w=300"
         alt="cola">
  </div>
  </span>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import useForm from '@/components/EditForms.vue';
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
export default class CocaCola extends Vue {

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
