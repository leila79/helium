<template>
    <div :class="mainClass">
        <div class="palce-holder-style">{{ title }} <span v-if="isRequired=='true'">*</span></div>
        <input type="text" :name="_name" :id="_name" :class="_class" :value="defaultValue" :disabled="Disabled">
    </div>
</template>

<script>
export default {
    name: 'AppInput',
    props: {
        title: {
            required: true,
            type: String
        },
        isRequired: {
            required: true,
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
        }
    }
}
</script>

<style scoped>
input {
    outline: none;
    border-color: rgba(19, 158, 202, 0.3);
    border-radius: 10px;
    padding: 0 10px;
    font-size: 1rem;
    color: var(--dark-grey-blue);
}
.palce-holder-style{
    font-size: 0.9rem;
    text-align: right;
    color: rgba(40, 57, 79, 0.6);
}
.name-input, .last-name-input {
    width: 100%;
    height: 3vw;
}
.email-input {
width: 100%;
height: 3vw;
}
.comment-input {
    width: 100%;
    height: 7vw;
}

</style>