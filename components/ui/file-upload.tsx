"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, File, Image, FileText, Film } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void
  maxSize?: number
  maxFiles?: number
  accept?: Record<string, string[]>
  className?: string
}

export function FileUpload({
  onFilesSelected,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'application/pdf': ['.pdf'],
  },
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
      setFiles(newFiles)
      onFilesSelected?.(newFiles)

      // Simulate upload progress
      acceptedFiles.forEach((file) => {
        let progress = 0
        const interval = setInterval(() => {
          progress += 10
          setUploadProgress((prev) => ({ ...prev, [file.name]: progress }))
          if (progress >= 100) {
            clearInterval(interval)
          }
        }, 200)
      })
    },
    [files, maxFiles, onFilesSelected]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    maxFiles,
    accept,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected?.(newFiles)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-4 w-4" />
    if (file.type === 'application/pdf') return <FileText className="h-4 w-4" />
    if (file.type.startsWith('video/')) return <Film className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
        {isDragActive ? (
          <p>Solte os arquivos aqui...</p>
        ) : (
          <div>
            <p className="font-medium">Arraste arquivos ou clique para selecionar</p>
            <p className="text-sm text-muted-foreground mt-1">
              Máximo de {maxFiles} arquivos, até {formatFileSize(maxSize)} cada
            </p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => {
            const progress = uploadProgress[file.name] || 0
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                {getFileIcon(file)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                  {progress < 100 && (
                    <Progress value={progress} className="h-1 mt-2" />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}