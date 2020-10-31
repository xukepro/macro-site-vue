/**
 * 归并排序，合并K个倒叙数组
 */

const mergeTwoList = (list1, list2) => {
  if (list1.length === 0 || list2.length === 0) return list1.length === 0 ? list2 : list1
  const arr = []
  let i = 0
  let j = 0
  while (i < list1.length && j < list2.length) {
    if (list1[i].updatedAt > list2[j].updatedAt) arr.push(list1[i++])
    else arr.push(list2[j++])
  }
  if (i === list1.length) {
    while (j < list2.length) arr.push(list2[j++])
  }
  if (j === list2.length) {
    while (i < list1.length) arr.push(list1[i++])
  }
  return arr
}

const merge = (lists, i, j) => {
  if (i === j) return lists[i]
  if (i > j) return []
  const mid = parseInt((i + j) / 2)
  return mergeTwoList(merge(lists, i, mid), merge(lists, mid + 1, j))
}

export const mergeKLists = (lists) => {
  console.log(lists)
  return merge(lists, 0, lists.length - 1)
}
