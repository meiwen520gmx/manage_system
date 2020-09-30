import Vue from "vue";
import {
  Button,
  Form,
  FormItem,
  Input,
  Icon,
  Message,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  Container,
  Header,
  Aside,
  Main
} from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tooltip);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);

Vue.prototype.$message = Message;
