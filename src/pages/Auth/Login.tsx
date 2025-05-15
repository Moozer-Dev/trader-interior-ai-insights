
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Github, LineChart, Mail } from "lucide-react";

// Adicione esquemas de validação Zod para login e registro
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
});

const registerSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "login";
  const isAdminLogin = searchParams.get("role") === "admin";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, register: registerUser, isAuthenticated, isAdmin } = useAuth();

  // Configurar formulário de login com react-hook-form + zod
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Configurar formulário de registro com react-hook-form + zod
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin && isAdminLogin) {
        navigate('/admin/users');
        toast({
          title: "Login administrador bem-sucedido",
          description: "Bem-vindo ao painel administrativo.",
        });
      } else if (isAdminLogin && !isAdmin) {
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Você não tem permissões de administrador.",
        });
        // Resetamos o login se um usuário comum tenta acessar área de admin
      } else {
        navigate('/dashboard');
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo de volta!",
        });
      }
    }
  }, [isAuthenticated, isAdmin, navigate, toast, isAdminLogin]);

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      // A navegação é gerenciada pelo useEffect acima
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast({
        title: "Conta criada com sucesso",
        description: "Agora você pode fazer login.",
      });
      setActiveTab("login");
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <LineChart className="h-6 w-6 text-primary mr-2" />
            <span className="text-2xl font-bold">TradeMaster</span>
          </Link>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isAdminLogin ? "Acesso administrativo" : "Bem-vindo"}
            </CardTitle>
            <CardDescription className="text-center">
              {isAdminLogin
                ? "Faça login com sua conta de administrador"
                : "Faça login na sua conta ou crie uma nova"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {!isAdminLogin ? (
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Cadastrar</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        {...loginForm.register("email")}
                      />
                      {loginForm.formState.errors.email && (
                        <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...loginForm.register("password")}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                      {loginForm.formState.isSubmitting ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Ou continue com
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        description: "Login com Google não está disponível neste momento."
                      });
                    }}>
                      <Mail className="mr-2 h-4 w-4" /> Google
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        description: "Login com GitHub não está disponível neste momento."
                      });
                    }}>
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        {...registerForm.register("name")}
                      />
                      {registerForm.formState.errors.name && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        {...registerForm.register("email")}
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        {...registerForm.register("password")}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar senha</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        {...registerForm.register("confirmPassword")}
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
                      {registerForm.formState.isSubmitting ? "Criando conta..." : "Criar conta"}
                    </Button>
                  </form>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Ou continue com
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        description: "Registro com Google não está disponível neste momento."
                      });
                    }}>
                      <Mail className="mr-2 h-4 w-4" /> Google
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        description: "Registro com GitHub não está disponível neste momento."
                      });
                    }}>
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email de administrador</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@email.com"
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...loginForm.register("password")}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? "Entrando..." : "Entrar como Administrador"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              {isAdminLogin ? (
                <div className="flex justify-center">
                  <Button variant="link" className="px-2 py-0" onClick={() => navigate('/auth/login')}>
                    Voltar para login de usuário normal
                  </Button>
                </div>
              ) : (
                <div className="text-center text-sm text-muted-foreground">
                  Ao continuar, você concorda com nossos{" "}
                  <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                    Termos de Serviço
                  </Link>{" "}
                  e{" "}
                  <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                    Política de Privacidade
                  </Link>
                  .
                </div>
              )}
            </div>
            <div className="text-center">
              <Link to="/" className="text-sm text-primary hover:underline">
                Voltar para a página inicial
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
