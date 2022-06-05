import axios from 'axios'
import { ElMessage } from 'element-plus'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axiosInstance.interceptors.response.use(
  (res) => {
    if (
      res.data.code === 200 ||
      res.data.data ||
      res.data.http_code === 200 ||
      res.data.code === 0 ||
      res.data.status_code === 0 ||
      res.data.err_no === 0 ||
      res.data.ret === 0 ||
      res.data['smpc.news-home.hotnews-daily'].code === '0'
    ) {
      return res
    } else {
      const msg = res.data.msg ? res.data.msg : '网络发生错误啦～'
      ElMessage.error(msg)
      return Promise.reject(msg)
    }
  },
  (err) => {
    ElMessage.error('网络发生错误啦～')
    return Promise.reject(err)
  }
)

export default axiosInstance
