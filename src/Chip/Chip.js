/**
 * @file Chip
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 */

import {create} from '../common/util/cx';
import css from '../common/util/css';
import san, {DataTypes} from 'san';
import Icon from '../Icon';

const cx = create('chip');

export default san.defineComponent({
    components: {
        'san-icon': Icon
    },
    template: `
        <div
            class="{{computedClassName}}"
            style="{{wrapperStyle}}"
            on-click="handleClick($event)">

            <slot></slot>
            <div
                class="${cx.getPartClassName('delete-icon-wrapper')}"
                on-click="handleDelete($event)">
                <san-icon

                    san-if=" showDelete && !disabled"
                    class="${cx.getPartClassName('delete-icon')}"
                    size="20">
                    close
                </san-icon>
            </div>
        </div>
     `,

    initData() {
        return {
            showDelete: false,
            disabled: false
        };
    },
    dataTypes: {
        showDelete: DataTypes.bool,
        disabled: DataTypes.bool
    },

    handleClick(e) {
        if (!this.data.get('disabled')) {
            this.fire('click', e);
        }
    },
    handleDelete(e) {
        if (!this.data.get('disabled')) {
            this.fire('delete', e);
        }
    },
    computed: {
        computedClassName() {
            const disabled = this.data.get('disabled');
            return cx(this)
                .addStates({
                    disabled,
                    normal: !disabled
                })
                .build();
        },
        wrapperStyle() {
            const color = this.data.get('color') ? this.data.get('color') : null;
            const backgroundColor = this.data.get('backgroundColor') ? this.data.get('backgroundColor') : null;
            return css({
                color,
                backgroundColor
            });
        }
    }
});
