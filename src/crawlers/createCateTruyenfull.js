import { xoaDau} from '../helpers/common'
import * as Model from '../database/models'
const cates = [
  'Tiên Hiệp',
  'Kiếm Hiệp',
  'Ngôn Tình',
  'Đô Thị',
  'Quan Trường',
  'Võng Du',
  'Khoa Huyễn',
  'Hệ Thống',
  'Huyền Huyễn',
  'Dị Giới',
  'Dị Năng',
  'Quân Sự',
  'Lịch Sử',
  'Xuyên Không',
  'Xuyên Nhanh',
  'Trọng Sinh',
  'Trinh Thám',
  'Thám Hiểm',
  'Linh Dị',
  'Sắc',
  'Ngược',
  'Sủng',
  'Cung Đấu',
  'Đông Phương',
  'Đam Mỹ',
  'Bách Hợp',
  'Hài Hước',
  'Điền Văn',
  'Cổ Đại',
  'Mạt Thế',
  'Truyện Teen',
  'Phương Tây',
  'Nữ Phụ',
  'Light Novel',
  'Việt Nam',
  'Đoản Văn',
  'Khác'
]
const run = async () => {
  const mapCates = cates.map((item) => {
    return {
      name: item,
      slug: xoaDau(item),
    }
  })
  Model.category.bulkCreate(mapCates, { ignoreDuplicates: true })
}

export default run