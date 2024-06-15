import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$delete']
>

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient()
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.accounts[':id'].$delete({
        param: { id },
      })
      return await res.json()
    },
    onSuccess: () => {
      toast.success('Account deleted')
      queryClient.invalidateQueries({ queryKey: ['account', { id }] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: () => {
      toast.error('Failed to delete account')
    },
  })
}
