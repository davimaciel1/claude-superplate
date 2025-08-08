"use client"

import { useState } from 'react'
import { Bell, Check, X, Archive, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  timestamp: Date
  action?: {
    label: string
    href: string
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nova tarefa atribuída',
      message: 'João atribuiu uma nova tarefa para você: "Revisar proposta"',
      type: 'info',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      action: {
        label: 'Ver tarefa',
        href: '/tasks/1',
      },
    },
    {
      id: '2',
      title: 'Deploy concluído',
      message: 'Seu deploy para produção foi concluído com sucesso',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: '3',
      title: 'Limite de API',
      message: 'Você atingiu 80% do limite de chamadas de API este mês',
      type: 'warning',
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-blue-600'
    }
  }

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m atrás`
    if (hours < 24) return `${hours}h atrás`
    return `${days}d atrás`
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notificações</h3>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-8 px-2"
              >
                <Check className="h-4 w-4 mr-1" />
                Marcar todas como lidas
              </Button>
            )}
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="unread">
              Não lidas {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[400px]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                  <Archive className="h-8 w-8 mb-2" />
                  <p>Nenhuma notificação</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onRemove={removeNotification}
                      getTypeColor={getTypeColor}
                      formatTime={formatTime}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[400px]">
              {notifications.filter(n => !n.read).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                  <Check className="h-8 w-8 mb-2" />
                  <p>Todas as notificações foram lidas</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications
                    .filter(n => !n.read)
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        onRemove={removeNotification}
                        getTypeColor={getTypeColor}
                        formatTime={formatTime}
                      />
                    ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onRemove,
  getTypeColor,
  formatTime,
}: {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onRemove: (id: string) => void
  getTypeColor: (type: Notification['type']) => string
  formatTime: (date: Date) => string
}) {
  return (
    <div
      className={`p-4 hover:bg-muted/50 transition-colors ${
        !notification.read ? 'bg-muted/20' : ''
      }`}
    >
      <div className="flex gap-3">
        <div
          className={`w-2 h-2 rounded-full mt-2 ${getTypeColor(
            notification.type
          )} ${!notification.read ? 'bg-current' : 'bg-transparent'}`}
        />
        <div className="flex-1 space-y-1">
          <p className="font-medium text-sm">{notification.title}</p>
          <p className="text-sm text-muted-foreground">
            {notification.message}
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">
              {formatTime(notification.timestamp)}
            </span>
            <div className="flex gap-1">
              {notification.action && (
                <Link href={notification.action.href}>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    {notification.action.label}
                  </Button>
                </Link>
              )}
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <Check className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onRemove(notification.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}