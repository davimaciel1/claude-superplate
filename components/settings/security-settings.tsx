"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Shield, Key, Smartphone, AlertTriangle } from 'lucide-react'

export function SecuritySettings() {
  const { toast } = useToast()
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Senha atualizada',
      description: 'Sua senha foi alterada com sucesso.',
    })
    setShowPasswordForm(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Autenticação</h3>
        
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <Key className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium">Senha</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Última alteração há 3 meses
              </p>
              {!showPasswordForm ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordForm(true)}
                >
                  Alterar senha
                </Button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-3">
                  <div>
                    <Label htmlFor="current-password">Senha atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">Nova senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm">
                      Salvar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPasswordForm(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-4 mt-4">
          <div className="flex items-start gap-4">
            <Smartphone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium">Autenticação de dois fatores</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Adicione uma camada extra de segurança à sua conta
              </p>
              <Button variant="outline" size="sm">
                Configurar 2FA
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Sessões ativas</h3>
        <div className="space-y-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Chrome no Windows</p>
                <p className="text-sm text-muted-foreground">
                  São Paulo, Brasil • Ativo agora
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Encerrar
              </Button>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Safari no iPhone</p>
                <p className="text-sm text-muted-foreground">
                  São Paulo, Brasil • Há 2 horas
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Encerrar
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 text-destructive">Zona de perigo</h3>
        <Card className="border-destructive p-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium">Deletar conta</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Uma vez deletada, sua conta não poderá ser recuperada
              </p>
              <Button variant="destructive" size="sm">
                Deletar conta permanentemente
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}