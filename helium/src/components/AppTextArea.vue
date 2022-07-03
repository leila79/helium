<template>
    <div :class="mainClass">
        <div class="palce-holder-style">{{ title }} <span v-if="isRequired=='true'">*</span></div>
        <textarea rows="4" cols="50" :name="_name" :id="_name" :class="_class" :placeholder="placeholder" :disabled="Disabled" v-on:keyup="sentoparent" v-model="data">></textarea>
    </div>
</template>

<script>
export default {
    name: 'AppTextArea',
    props: {
        title: {
            required: false,
            type: String
        },
        isRequired: {
            required: false,
            type: Boolean
        },
        _name: {
            required: false,
            type: String
        },
        _class: {
            required: false,
            type: String
        },
        mainClass: {
            required: false,
            type: String
        },
        defaultValue: {
            required: false,
            type: String
        },
        Disabled: {
            required:false,
            type: Boolean
        },
        placeholder:{
            required : false,
            type:String
        }
    },
    data(){
        return{
            data : ""
        }
    },
    methods:{
        sentoparent(){
            this.$emit('childToParent', this.data)
        }
    }
}
</script>

<style scoped>
textarea {
    
    width: 100%;
    border-color: rgba(19, 158, 202, 0.3);
    border-radius: 10px;
    padding: 7px 15px;
    font-size: 1rem;
    width: 95%;
    color: var(--dark-grey-blue);
    outline-color: #30bfb7;
}
.palce-holder-style{
    font-size: 0.9rem;
    text-align: right;
    color: rgba(40, 57, 79, 0.6);
}
.comment-input {
    width: 100%;
    height: 7vw;
}

</style>