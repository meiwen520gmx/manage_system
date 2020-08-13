import Mock from "mockjs";


let List = [];
const count = 1000;
let typelist = ["财务部", "人事部", "市场部", "技术部", "营销部"]; //整个公司的部门类型

for (let i = 0; i < count; i++) {
  //生成1000个员工信息
  List.push(
    Mock.mock({
      sortnum: i + 1,
      workId: Mock.Random.guid(),
      username: Mock.Random.cname(),
      email: Mock.Random.email(),
      university: Mock.mock("@university(true)"),
      region: Mock.mock("@region"),
      ComeInTime: Mock.Random.datetime(),
      "department|1": typelist,
    })
  );
}

export default {
  //用户登录
  login: (config) => {
    let data = JSON.parse(config.body);
    let userInfo = {};
    switch (data.username) {
      case "boss":
        userInfo = {
          token: "boss",
          name: "公司管理员",
        };
        break;
      case "finance":
        userInfo = {
          token: "finance",
          name: "财务部长",
        };
        break;
      case "market":
        userInfo = {
          token: "market",
          name: "市场部长",
        };
        break;
      case "personManage":
        userInfo = {
          token: "personManage",
          name: "人事部长",
        };
        break;
      case "technology":
        userInfo = {
          token: "technology",
          name: "技术部长",
        };
        break;
      default:
        return {
          code: -1,
          data: {
            message: "用户名错误",
            status: "fail",
          },
        };
    }
    return {
      code: 200,
      data: {
        userInfo,
      },
    };
  },
  //用户退出
  logout: (config) => {
    return {
      code: 200,
      data: {
        userInfo: "",
      },
    };
  },
  //获取用户登录信息
  getUserInfo: (config) => {
    let data = JSON.parse(config.body);
    let userInfo = {};
    switch (data.token) {
      case "boss":
        userInfo = {
          roles: ["boss"],
          name: "boss",
          avatar:
            "https://avatars3.githubusercontent.com/u/40172690?s=460&u=4a9a0148ff0d787842afcafb8f1c7835fb4d68a7&v=4",
        };
        break;
      case "finance":
        userInfo = {
          roles: ["finance"],
          name: "finance",
          avatar: "",
        };
        break;
      case "market":
        userInfo = {
          roles: ["market"],
          name: "market",
          avatar: "",
        };
        break;
      case "personManage":
        userInfo = {
          roles: ["personManage"],
          name: "personManage",
          avatar: "",
        };
        break;
      case "technology":
        userInfo = {
          roles: ["technology"],
          name: "technology",
          avatar: "",
        };
        break;
      default:
        userInfo = {};
    }
    return {
      code: 200,
      data: {
        userInfo,
      },
    };
  },
  /**
   * 获取员工列表
   * @params page, limit
   */
  getUserList: (config) => {
    const { limit, page } = JSON.parse(config.body);
    let mockList = List;
    const userList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 200,
      data:{
        total: mockList.length,//总共的条数
        userList
      }
    }
  },
};
