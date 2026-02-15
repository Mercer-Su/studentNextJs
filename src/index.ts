import axios from 'axios';
//知识装饰器-实现一个GET请求
//踩坑记录 MethodDecorator
const Get = (url):MethodDecorator  => {
    //PropertyDescriptor
    return (target: any, key: any, descriptor: PropertyDescriptor) => {
        const fun = descriptor.value;
        axios.get(url)//, {params: fun})
            .then((res) => {
                fun(res, {
                    status: 200,
                    succes: true
                })
            }).catch((err => {
                fun(err, {
                    status: 500,
                    succes: false
                })
            })
        )
    }
}

class Controller {

    constructor() {

    }

    @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
    getList(res,status) {
        console.log(res.data, status);
    }
}