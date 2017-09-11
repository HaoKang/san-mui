/**
 * @file 表格
 * @author errorrik<errorrik@gmail.com>
 * @author jinzhubaofu <leonlu@outlook.com>
 */

import {DataTypes} from 'san';

import Table from './Table';
import THead from './THead';
import TBody from './TBody';
import TR from './TR';
import TD from './TD';
import TH from './TH';

export default class ConfigurableTable extends Table {
    static components = {
        'ui-tr': TR,
        'ui-th': TH,
        'ui-td': TD,
        'ui-tbody': TBody,
        'ui-thead': THead
    };

    static messages = Table.messages;

    static filters = {
        renderField(field, item) {
            if (typeof field.content === 'function') {
                return field.content.call(this, item);
            }
            else if (field.prop) {
                return item[field.prop];
            }

            return '';
        }
    };

    static template = `
        <table class="{{className}}">
            <ui-thead>
                <ui-tr>
                    <ui-td san-for="field in fields">{{field.title}}</ui-td>
                </ui-tr>
            </ui-thead>
            <ui-tbody>
                <ui-tr san-for="item in data" selected="{=item.selected=}" disabled="{{item.disabled}}">
                    <ui-td san-for="field in fields">{{field | renderField(item)}}</ui-td>
                </ui-tr>
            </ui-tbody>
        </table>
    `;

    static dataTypes = {
        ...Table.dataTypes,
        fields: DataTypes.arrayOf(DataTypes.shape({
            prop: DataTypes.string,
            title: DataTypes.string,
            content: DataTypes.func
        })),
        data: DataTypes.array
    };
}
