"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { CreditCard, Download, AlertCircle } from 'lucide-react'

export function BillingSettings() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast({
      title: 'Redirecionando...',
      description: 'Você será redirecionado para o checkout.',
    })
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Plano atual</h3>
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-xl font-semibold">Plano Pro</h4>
                <Badge>Ativo</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                R$ 49,90/mês • Renova em 15 de janeiro
              </p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Usuários</span>
                    <span className="font-medium">3 de 10</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Armazenamento</span>
                    <span className="font-medium">25GB de 100GB</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>API Calls</span>
                    <span className="font-medium">5.000 de 50.000</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Mudar plano
              </Button>
              <Button variant="ghost" size="sm" className="w-full text-destructive">
                Cancelar assinatura
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Método de pagamento</h3>
        <div className="space-y-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expira 12/2025</p>
                </div>
                <Badge variant="secondary">Padrão</Badge>
              </div>
              <Button variant="ghost" size="sm">
                Editar
              </Button>
            </div>
          </Card>
          
          <Button variant="outline" className="w-full">
            Adicionar método de pagamento
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Histórico de faturas</h3>
        <div className="space-y-2">
          {[
            { date: '1 Dez 2024', amount: 'R$ 49,90', status: 'Pago' },
            { date: '1 Nov 2024', amount: 'R$ 49,90', status: 'Pago' },
            { date: '1 Out 2024', amount: 'R$ 49,90', status: 'Pago' },
          ].map((invoice, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{invoice.amount}</p>
                  <p className="text-sm text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{invoice.status}</Badge>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900 dark:text-blue-100">
              Dica: Economize 20% no plano anual
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
              Mude para o plano anual e economize R$ 119,76 por ano.
            </p>
            <Button 
              size="sm" 
              className="mt-3"
              onClick={handleUpgrade}
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Mudar para anual'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}