'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'

type PromiseProps = {
  resolve: (value: boolean) => void
} | null

export function useConfirm(
  title: string,
  message: string,
): [() => JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = useState<PromiseProps>(null)

  function confirm() {
    return new Promise((resolve) => {
      setPromise({ resolve })
    })
  }

  function handleClose() {
    setPromise(null)
  }

  function handleConfirm() {
    promise?.resolve(true)
    handleClose()
  }

  function handleCancel() {
    promise?.resolve(false)
    handleClose()
  }

  function ConfirmationDialog() {
    return (
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return [ConfirmationDialog, confirm]
}
