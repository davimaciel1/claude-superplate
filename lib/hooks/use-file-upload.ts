import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface UploadOptions {
  endpoint: string
  onSuccess?: (response: any) => void
  onError?: (error: Error) => void
}

export function useFileUpload() {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = async (files: File[], options: UploadOptions) => {
    setUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('files', file)
      })

      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100
          setProgress(Math.round(percentComplete))
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          toast({
            title: 'Upload concluído',
            description: `${files.length} arquivo(s) enviado(s) com sucesso.`,
          })
          options.onSuccess?.(response)
        } else {
          throw new Error('Upload failed')
        }
        setUploading(false)
      })

      xhr.addEventListener('error', () => {
        const error = new Error('Upload failed')
        toast({
          title: 'Erro no upload',
          description: 'Falha ao enviar arquivo(s).',
          variant: 'destructive',
        })
        options.onError?.(error)
        setUploading(false)
      })

      xhr.open('POST', options.endpoint)
      xhr.send(formData)
    } catch (error) {
      toast({
        title: 'Erro no upload',
        description: 'Falha ao enviar arquivo(s).',
        variant: 'destructive',
      })
      options.onError?.(error as Error)
      setUploading(false)
    }
  }

  return { upload, uploading, progress }
}