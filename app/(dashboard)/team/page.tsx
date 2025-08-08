import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, UserPlus, Mail, Shield, UserX, Search } from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    role: 'Admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    status: 'online',
    department: 'Engenharia',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    role: 'Membro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    status: 'online',
    department: 'Design',
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro.costa@empresa.com',
    role: 'Membro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    status: 'offline',
    department: 'Marketing',
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    email: 'ana.oliveira@empresa.com',
    role: 'Moderador',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    status: 'away',
    department: 'Vendas',
  },
]

export default function TeamPage() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Equipe</h1>
          <p className="text-muted-foreground">
            Gerencie os membros da sua equipe e suas permissões
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Convidar membro
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Visão geral da equipe</CardTitle>
          <CardDescription>
            Você tem {teamMembers.length} membros na sua equipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{teamMembers.length}</p>
              <p className="text-sm text-muted-foreground">Total de membros</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {teamMembers.filter(m => m.status === 'online').length}
              </p>
              <p className="text-sm text-muted-foreground">Online agora</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {teamMembers.filter(m => m.role === 'Admin').length}
              </p>
              <p className="text-sm text-muted-foreground">Administradores</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-muted-foreground">Departamentos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Membros da equipe</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os membros da equipe
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar membros..."
                  className="pl-8 w-[200px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                        member.status === 'online'
                          ? 'bg-green-500'
                          : member.status === 'away'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary">{member.department}</Badge>
                      <Badge
                        variant={member.role === 'Admin' ? 'default' : 'outline'}
                      >
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar mensagem
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield className="h-4 w-4 mr-2" />
                      Alterar permissões
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <UserX className="h-4 w-4 mr-2" />
                      Remover da equipe
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}