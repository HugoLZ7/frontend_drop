import { RegisterForm } from "@/components/auth/register-form";
import { getAreaCodes } from "@/lib/catalogs";

export default async function RegisterPage() {
  const areaCodes = await getAreaCodes();
  return <RegisterForm areaCodes={areaCodes} />;
}
