import React, { useState } from "react";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as StoreService from '../../service/StoreService'
import { Button, Form } from "antd"
import * as Message from '../../components/Message/Message'
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import InputComponents from "../../components/InputComponents/InputComponents";


const FormPage = () => {
    const [form] = Form.useForm()
    const [stateStore, setStateStore] = useState({
        storeName: "",
        address: "",
        email: "",
        phone: "",
        // file: null,
    });

    const mutation = useMutationHooks((data) => {
        const res = StoreService.createStore({
            ...data,
        })
        return res
    })

    const { data } = mutation
    const handleOnChange = (e) => {
        setStateStore({
            ...stateStore,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = () => {
        mutation.mutate({
            name: stateStore?.name,
            image: stateStore?.image,
            address: stateStore?.address,
            phone: stateStore?.phone,
            rating: stateStore?.rating,
            count: stateStore?.count,
        },
            {
                onSuccess: () => {
                    Message.success("Chờ quản trị viên xét duyệt thông tin")
                }
            }
        )
    }


    return (
        <DrawerComponent title='Thông Tin Cửa Hàng' isOpen={true} width='100%' >
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={handleSubmit}
                autoComplete="on"
                form={form}
            >
                <Form.Item
                    label="Tên Cửa Hàng"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng' }]}
                >
                    <InputComponents value={stateStore.name} onChange={handleOnChange} name="name" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </DrawerComponent>
    );
};

export default FormPage;